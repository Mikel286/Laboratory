import pandas as pd

# Cargar el archivo original (ajustá la ruta si es necesario)
df = pd.read_csv("data/data.csv", encoding='latin1', sep=';')

# Seleccionar solo las columnas que te interesan
columnas_utiles = ['latitud', 'longitud', 'comuna', 'region', 'cantidad_toneladas']
df_filtrado = df[columnas_utiles]

# Guardar el nuevo archivo
df_filtrado.to_csv("data/data_filtering.csv", index=False)

# Cargar nuevo CSV creado
df = pd.read_csv("data/data_filtering.csv", sep=",", quotechar='"')

# Limpiar columna de toneladas
df['cantidad_toneladas'] = df['cantidad_toneladas'].astype(str).str.replace(",", ".").astype(float)

# Agrupar: sumar toneladas y mantener la primera lat/lon/región por comuna
resultado = df.groupby('comuna').agg({
    'latitud': 'first',
    'longitud': 'first',
    'region': 'first',
    'cantidad_toneladas': 'sum'
}).reset_index()

resultado.to_csv("data/general data.csv", index=False)