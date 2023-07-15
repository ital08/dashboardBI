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

distancias_promedio_por_mes = {}

with open(archivo_csv, 'r') as f:
    total_registros = sum(1 for line in f) - 1  # Restamos 1 para excluir la fila de encabezados
    f.seek(0)  # Regresamos al inicio del archivo
    lector_csv = csv.reader(f, delimiter=';')
    encabezados = next(lector_csv)
    latitud_idx = encabezados.index('start_lat')
    longitud_idx = encabezados.index('start_lon')
    distancia_idx = encabezados.index('distance')
    end_state_idx = encabezados.index('end_state')
    fecha_idx = encabezados.index('start_at')
    
    for fila in lector_csv:
        latitud_str = fila[latitud_idx].replace(',', '.')
        longitud_str = fila[longitud_idx].replace(',', '.')
        distancia_str = fila[distancia_idx]
        end_state = fila[end_state_idx]
        fecha_str = fila[fecha_idx]
        
        if not latitud_str or not longitud_str or not distancia_str or not fecha_str or end_state != "drop off":
            continue
        
        latitud = float(latitud_str)
        longitud = float(longitud_str)
        distancia = float(distancia_str)
        
        distrito = obtener_distrito(latitud, longitud, distritos_geojson["features"])
        
        fecha = datetime.strptime(fecha_str, '%d/%m/%Y %H:%M')
        mes = fecha.strftime('%m')
        
        if mes not in distancias_promedio_por_mes:
            distancias_promedio_por_mes[mes] = {
                'total_distancia': 0.0,
                'total_viajes': 0
            }
        
        distancias_promedio_por_mes[mes]['total_distancia'] += distancia
        distancias_promedio_por_mes[mes]['total_viajes'] += 1
        
        registros_procesados += 1
        
        # Calcula el porcentaje de progreso
        porcentaje_progreso = (registros_procesados / total_registros) * 100
        print(f"Procesando registros... Completado: {porcentaje_progreso:.2f}%")

# Calcula el promedio de distancia por mes
distancias_promedio_json = []
for mes, datos_mes in distancias_promedio_por_mes.items():
    total_distancia = datos_mes['total_distancia']
    total_viajes = datos_mes['total_viajes']
    
    if total_viajes > 0:
        promedio_distancia = total_distancia / total_viajes
    else:
        promedio_distancia = 0.0
    
    distancias_mes_objeto = {
        'mes': mes,
        'promedio_distancia': promedio_distancia
    }
    distancias_promedio_json.append(distancias_mes_objeto)

# Ordena los resultados por mes
distancias_promedio_json = sorted(distancias_promedio_json, key=lambda x: int(x['mes']))

# Actualiza el nombre del mes en el objeto
for distancias_mes_objeto in distancias_promedio_json:
    mes_numero = distancias_mes_objeto['mes']
    nombre_mes = datetime.strptime(mes_numero, '%m').strftime('%B')
    distancias_mes_objeto['mes'] = nombre_mes

# Guarda el archivo JSON
archivo_json = './src/assets/distancias_promedio.json'
with open(archivo_json, 'w') as f:
    json.dump(distancias_promedio_json, f, indent=4)

print("Archivo JSON generado exitosamente.")
