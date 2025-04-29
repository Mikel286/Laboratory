from pytube import YouTube
from moviepy.audio.io.AudioFileClip import AudioFileClip
import os

def descargar_MP3(link, carpeta_destino = "downloads"):

    if not os.path.exists(carpeta_destino):
        os.makedirs(carpeta_destino)

    try:

        # Descargamos el video
        link = YouTube(link)
        print(f"Descargando: {link}")
        video = link.streams.filter(only_audio = True).first()
        ruta_descarga = video.download(output_path = carpeta_destino)

        # Convertimos a formato mp3
        base, ext = os.path.splitext(ruta_descarga)
        archivo = base + ".mp3"

        print("Convirtiendo a MP3...")
        clip = AudioFileClip(ruta_descarga)
        clip.write_audiofile(archivo)
        clip.close()

        # Remover archivo original de la descarga
        os.remove(ruta_descarga)

        print(f"¡Descarga completa! Guardado en: {archivo}")

    except Exception as e:
        print(f"Ocurrió un error: {e}")

# Ejemplo de uso:
if __name__ == "__main__":
    link_youtube = input("Pega el link de YouTube: ")
    descargar_MP3(link_youtube)


