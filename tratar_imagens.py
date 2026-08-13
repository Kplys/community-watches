import os
from rembg import remove
from PIL import Image

input_folder = './fotos_brutas'
output_folder = './public/watches'

os.makedirs(output_folder, exist_ok=True)

for file_name in os.listdir(input_folder):
    if file_name.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
        input_path = os.path.join(input_folder, file_name)
        base_name = os.path.splitext(file_name)[0]
        output_path = os.path.join(output_folder, f"{base_name}.webp")

        print(f"Processando {file_name}...")
        try:
            inp = Image.open(input_path)
            output = remove(inp)
            output.save(output_path, 'WEBP')
            print(f"Salvo: {base_name}.webp em {output_folder}")
        except Exception as e:
            print(f"Erro ao processar {file_name}: {e}")

print("Processamento concluído!")