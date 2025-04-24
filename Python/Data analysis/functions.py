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
    data_residuos = pd.read_csv('data/commune_data.csv')
    
    data_censo = pd.read_csv('data/census2024_data.csv', encoding='utf-8')
    data_censo = data_censo[['comuna', 'Población censada']]
    
    data_capita = pd.merge(data_censo, data_residuos, on='comuna')

    data_capita['residuos_per_capita'] = data_capita['cantidad_toneladas'] / data_capita['Población censada']

    data_capita.to_csv("data/commune_capita.csv", index=False)

    top_5 = data_capita.sort_values(by='residuos_per_capita', ascending=False).head(5)
    
    print(top_5)



    
    