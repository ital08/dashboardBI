import csv
import json
from shapely.geometry import shape, Point
from unidecode import unidecode

# DISTRITOS DE

def obtener_distrito(latitud, longitud, distritos):
    punto = Point(longitud, latitud)
    for distrito in distritos:
        poligono = shape(distrito['geometry'])
        
        if poligono.contains(punto):
            return  unidecode(distrito['properties']['name'])
   
    return "Ninguno"

# Cargar el archivo GeoJSON de distritos
archivo_geojson = './src/assets/lima_callao_distritos.geojson'
with open(archivo_geojson, 'r') as f:
    distritos_geojson = json.load(f)

# Lee el archivo CSV
archivo_csv = './src/assets/uber_peru_2010.csv'
cantidad_registros = None

registros_por_distrito = {}

with open(archivo_csv, 'r') as f:
    lector_csv = csv.reader(f, delimiter=';')
    encabezados = next(lector_csv)
    latitud_idx = encabezados.index('start_lat')
    longitud_idx = encabezados.index('start_lon')
    
    for i, fila in enumerate(lector_csv):
        if cantidad_registros is not None and i >= cantidad_registros:
            break
        
        latitud_str = fila[latitud_idx].replace(',', '.')
        longitud_str = fila[longitud_idx].replace(',', '.')
        
        if not latitud_str or not longitud_str:
            continue
        
        latitud = float(latitud_str)
        longitud = float(longitud_str)
        
        distrito = obtener_distrito(latitud, longitud, distritos_geojson["features"])
        
        print(distrito)
        
        registros_por_distrito[distrito] = registros_por_distrito.get(distrito, 0) + 1

# Genera la lista de objetos para el archivo JSON
distritos_json = []
for distrito, cantidad_registros in registros_por_distrito.items():
    distrito_objeto = {
        'name': distrito.upper(),
        'value': cantidad_registros
    }
    distritos_json.append(distrito_objeto)

# Guarda el archivo JSON
archivo_json = './src/assets/resultados.json'
with open(archivo_json, 'w') as f:
    json.dump(distritos_json, f, indent=4)

print("Archivo JSON generado exitosamente.")
