import pandas as pd

# Cargar el archivo original (ajustá la ruta si es necesario)
df = pd.read_csv("data/data.csv", encoding='latin1', sep=';')

# Seleccionar solo las columnas que te interesan
columnas_utiles = ['latitud', 'longitud', 'comuna', 'region', 'cantidad_toneladas']
df_filtrado = df[columnas_utiles]

# Guardar el nuevo archivo
df_filtrado.to_csv("data/data filtering.csv", index=False)

print("✅ Archivo guardado como 'datos_filtrados.csv'")