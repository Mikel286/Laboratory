import pandas as pd

def data_filtering(data, colums):

    # Cargar el archivo original (ajustá la ruta si es necesario)
    df = pd.read_csv(data, encoding='latin1', sep=';')

    # Seleccionar solo las columnas que te interesan
    df_filtrado = df[colums]

    # Guardar el nuevo archivo
    df_filtrado.to_csv("data/data_filtering.csv", index=False)

def commune_data(data):

    # Cargar nuevo CSV creado
    df = pd.read_csv(data, sep=",", quotechar='"')

    # Limpiar las columnas
    df['cantidad_toneladas'] = df['cantidad_toneladas'].astype(str).str.replace(",", ".").astype(float)
    df['latitud'] = df['latitud'].astype(str).str.replace(",", ".").astype(float)
    df['longitud'] = df['longitud'].astype(str).str.replace(",", ".").astype(float)

    # Agrupar: sumar toneladas y mantener la primera lat/lon/región por comuna
    resultado = df.groupby('comuna').agg({
        'latitud': 'first',
        'longitud': 'first',
        'region': 'first',
        'cantidad_toneladas': 'sum'
    }).reset_index()

    resultado = resultado.sort_values(by="region")

    resultado.to_csv("data/commune_data.csv", index=False)

def region_data(data):

    # Cargar nuevo CSV creado
    df = pd.read_csv(data, sep=",", quotechar='"')

    # Agrupar: sumar toneladas y mantener la primera lat/lon/región por comuna
    resultado = df.groupby('region').agg({
        'cantidad_toneladas': 'sum'
    }).reset_index()

    resultado.to_csv("data/region_data.csv", index=False)

if __name__=="__main__":
    # Cargar el archivo CSV
    df = pd.read_csv('data/commune_data.csv')

    # Encontrar el índice de la fila con el valor máximo en 'cantidad_toneladas'
    # max_row = df[df['cantidad_toneladas'] == df['cantidad_toneladas'].max()]
    #print(max_row)

    # Filtrar los cinco registros mas altos
    max_rows = df.nlargest(5, 'cantidad_toneladas')
    print(max_rows)
    