import csv
import json
from shapely.geometry import shape, Point
from unidecode import unidecode
from datetime import datetime

# DISTRITOS DE LIMA Y CALLAO

def obtener_distrito(latitud, longitud, distritos):
    punto = Point(longitud, latitud)
    for distrito in distritos:
        poligono = shape(distrito['geometry'])
        
        if poligono.contains(punto):
            return unidecode(distrito['properties']['name'])
   
    return "Ninguno"

# Cargar el archivo GeoJSON de distritos
archivo_geojson = './src/assets/lima_callao_distritos.geojson'
with open(archivo_geojson, 'r') as f:
    distritos_geojson = json.load(f)

# Lee el archivo CSV
archivo_csv = './src/assets/uber_peru_2010.csv'
cantidad_registros = None
total_registros = 0
registros_procesados = 0

distancias_por_mes_distrito = {}

with open(archivo_csv, 'r') as f:
    total_registros = sum(1 for line in f) - 1  # Restamos 1 para excluir la fila de encabezados
    f.seek(0)  # Regresamos al inicio del archivo
    lector_csv = csv.reader(f, delimiter=';')
    encabezados = next(lector_csv)
    latitud_idx = encabezados.index('start_lat')
    longitud_idx = encabezados.index('start_lon')
    distancia_idx = encabezados.index('distance')
    fecha_idx = encabezados.index('start_at')
    
    for fila in lector_csv:
        latitud_str = fila[latitud_idx].replace(',', '.')
        longitud_str = fila[longitud_idx].replace(',', '.')
        distancia_str = fila[distancia_idx]
        fecha_str = fila[fecha_idx]
        
        if not latitud_str or not longitud_str or not distancia_str or not fecha_str:
            continue
        
        latitud = float(latitud_str)
        longitud = float(longitud_str)
        distancia = float(distancia_str)
        
        distrito = obtener_distrito(latitud, longitud, distritos_geojson["features"])
        
        fecha = datetime.strptime(fecha_str, '%d/%m/%Y %H:%M')
        mes = fecha.strftime('%m')
        
        if mes not in distancias_por_mes_distrito:
            distancias_por_mes_distrito[mes] = {}
        
        if distrito not in distancias_por_mes_distrito[mes]:
            distancias_por_mes_distrito[mes][distrito] = 0.0
        
        distancias_por_mes_distrito[mes][distrito] += distancia
        
        registros_procesados += 1
        
        # Calcula el porcentaje de progreso
        porcentaje_progreso = (registros_procesados / total_registros) * 100
        print(f"Procesando registros... Completado: {porcentaje_progreso:.2f}%")

# Genera la lista de objetos para el archivo JSON
distancias_json = []
for mes, distancias_por_distrito in distancias_por_mes_distrito.items():
    distritos_mes = []
    for distrito, distancia_total in distancias_por_distrito.items():
        distrito_objeto = {
            'name': distrito.upper(),
            'total_distance': distancia_total
        }
        distritos_mes.append(distrito_objeto)
    
    distritos_mes_objeto = {
        'mes': mes,
        'distritos': distritos_mes
    }
    distancias_json.append(distritos_mes_objeto)

# Ordena los resultados por mes
distancias_json = sorted(distancias_json, key=lambda x: int(x['mes']))

# Actualiza el nombre del mes en el objeto
for distancias_mes_objeto in distancias_json:
    mes_numero = distancias_mes_objeto['mes']
    nombre_mes = datetime.strptime(mes_numero, '%m').strftime('%B')
    distancias_mes_objeto['mes'] = nombre_mes

# Guarda el archivo JSON
archivo_json = './src/assets/distancias.json'
with open(archivo_json, 'w') as f:
    json.dump(distancias_json, f, indent=4)

print("Archivo JSON generado exitosamente.")
