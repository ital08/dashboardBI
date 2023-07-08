import csv
import json

def create_end_state_json(csv_file, json_file):
    end_state_counts = {}

    with open(csv_file, 'r') as f:
        reader = csv.reader(f, delimiter=';')
        headers = next(reader)

        end_state_idx = headers.index('end_state')

        for row in reader:
            end_state = row[end_state_idx]
            end_state_counts[end_state] = end_state_counts.get(end_state, 0) + 1

    result = [{'name': state, 'value': count} for state, count in end_state_counts.items()]

    with open(json_file, 'w') as f:
        json.dump(result, f, indent=4)

    print("JSON generado exitosamente.")

# Cambia los siguientes nombres de archivo según corresponda
csv_file = './src/assets/uber_peru_2010.csv'
json_file = './src/assets/resultados_tasa_cancelacion.json'

create_end_state_json(csv_file, json_file)
