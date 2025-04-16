from functions import data_filtering, commune_data, region_data

# Generamos nuevo archivo data_filtering.csv
colums = ['latitud', 'longitud', 'comuna', 'region', 'cantidad_toneladas']
data_filtering("data/data.csv", colums)

# Generar nuevo archivo commune_data.csv
commune_data("data/data_filtering.csv")

region_data("data/commune_data.csv")