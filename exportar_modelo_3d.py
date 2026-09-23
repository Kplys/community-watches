"""Converte um relógio modelado no Blender no .glb que o app carrega.

Uso (o script roda dentro do Blender, não no Python do sistema):

    /Applications/Blender.app/Contents/MacOS/Blender -b relogio_seiko_3d.blend \
        --python exportar_modelo_3d.py -- public/models/seiko-skx007.glb

O que ele faz, nesta ordem:
  - joga fora câmeras e luzes, porque a cena do app tem a iluminação dela;
  - baixa a resolução dos textos do mostrador e os bevels para 1 segmento — num
    relógio de 42 mm exibido com algumas centenas de pixels nada disso aparece,
    e é o que separa um arquivo de 5 MB de um de 1,2 MB;
  - converte texto em malha e aplica os modificadores;
  - troca o vidro (transmission 1.0, que o glTF não carrega bem) por um material
    translúcido simples, igual ao dos outros relógios do app;
  - junta os objetos por material, deixando a caixa de fora: são ~500 objetos que
    viram ~10, e cada um é uma chamada de desenho a menos por quadro.

A caixa fica como um nó separado chamado `case` de propósito: é por ela que o
main.js centra e escala o modelo (MODELS/normalizeModel), para o relógio ocupar
o mesmo espaço que os relógios montados em código.
"""

import bpy
import os
import sys
from collections import defaultdict

PREFIXO_CAIXA = 'Caixa principal'

# material do Blender -> nome do nó no .glb
NOMES = {
    'Aço escovado': 'brushedSteel',
    'Aço polido': 'polishedSteel',
    'Cristal transparente': 'crystal',
    'Impressão branca': 'whitePrint',
    'Impressão preta': 'blackPrint',
    'Inscrição vermelha': 'redPrint',
    'Inserto preto do bisel': 'bezelInsert',
    'Lume marfim': 'lume',
    'Mostrador preto': 'dial',
}


def main(saida):
    vl = bpy.context.view_layer

    # o cristal costuma vir escondido pelo ícone do olho; nada pode ficar de fora
    for o in bpy.data.objects:
        o.hide_set(False)
        o.hide_viewport = False
        o.hide_render = False
    for c in bpy.data.collections:
        c.hide_viewport = False
        c.hide_render = False

    for o in [o for o in bpy.data.objects if o.type in ('CAMERA', 'LIGHT')]:
        bpy.data.objects.remove(o, do_unlink=True)

    for o in bpy.data.objects:
        if o.type == 'FONT':
            o.data.resolution_u = 4
            o.data.bevel_resolution = 1
        for m in o.modifiers:
            if m.type == 'BEVEL':
                m.segments = 1

    bpy.ops.object.select_all(action='DESELECT')
    conv = [o for o in bpy.data.objects
            if o.type in ('FONT', 'CURVE', 'SURFACE', 'META', 'MESH')]
    for o in conv:
        o.select_set(True)
    vl.objects.active = conv[0]
    bpy.ops.object.convert(target='MESH')
    print(f"[export] {len(conv)} objetos convertidos em malha")

    for o in [o for o in bpy.data.objects
              if o.type == 'MESH' and len(o.data.polygons) == 0]:
        print(f"[export] descartando objeto vazio {o.name!r}")
        bpy.data.objects.remove(o, do_unlink=True)

    cristal = bpy.data.materials.get('Cristal transparente')
    if cristal and cristal.node_tree:
        bsdf = next((n for n in cristal.node_tree.nodes
                     if n.type == 'BSDF_PRINCIPLED'), None)
        if bsdf:
            if 'Transmission Weight' in bsdf.inputs:
                bsdf.inputs['Transmission Weight'].default_value = 0.0
            bsdf.inputs['Alpha'].default_value = 0.25
        cristal.blend_method = 'BLEND'

    caixa = next((o for o in bpy.data.objects
                  if o.name.startswith(PREFIXO_CAIXA)), None)
    if caixa is None:
        raise SystemExit(f"[export] não achei a caixa (prefixo {PREFIXO_CAIXA!r})")

    grupos = defaultdict(list)
    for o in bpy.data.objects:
        if o.type != 'MESH' or o is caixa:
            continue
        mats = [m.name for m in o.data.materials if m]
        grupos[mats[0] if mats else '<sem material>'].append(o)

    for material, objs in sorted(grupos.items()):
        bpy.ops.object.select_all(action='DESELECT')
        for o in objs:
            o.select_set(True)
        vl.objects.active = objs[0]
        if len(objs) > 1:
            bpy.ops.object.join()
        vl.objects.active.name = NOMES.get(material, material)
        print(f"[export] {material!r}: {len(objs)} objetos -> {vl.objects.active.name!r}")

    caixa.name = 'case'
    bpy.ops.object.select_all(action='DESELECT')

    tris = sum(sum(max(len(p.vertices) - 2, 0) for p in o.data.polygons)
               for o in bpy.data.objects if o.type == 'MESH')
    print(f"[export] {len(bpy.data.objects)} objetos, {tris} triângulos")

    opcoes = dict(
        filepath=saida,
        export_format='GLB',
        export_apply=True,
        export_yup=True,
        export_cameras=False,
        export_lights=False,
        export_materials='EXPORT',
        export_normals=True,
        export_tangents=False,
        export_texcoords=False,
        export_animations=False,
        export_skins=False,
        export_morph=False,
        export_draco_mesh_compression_enable=False,
        export_extras=False,
        use_selection=False,
    )
    # versões diferentes do Blender aceitam conjuntos diferentes de opções
    aceitas = bpy.ops.export_scene.gltf.get_rna_type().properties.keys()
    bpy.ops.export_scene.gltf(**{k: v for k, v in opcoes.items() if k in aceitas})
    print(f"[export] gravado {saida} ({os.path.getsize(saida)} bytes)")


if __name__ == '__main__':
    if '--' not in sys.argv:
        raise SystemExit('uso: ... --python exportar_modelo_3d.py -- <saida.glb>')
    main(sys.argv[sys.argv.index('--') + 1])
