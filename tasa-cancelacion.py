import csv
import json

def create_end_state_json(csv_file, json_file):
    end_state_counts_per_month = {}
    total_trips_per_month = {}

    with open(csv_file, 'r') as f:
        reader = csv.reader(f, delimiter=';')
        headers = next(reader)

        end_state_idx = headers.index('end_state')
        start_at_idx = headers.index('start_at')

        for row in reader:
            end_state = row[end_state_idx]
            start_at_str = row[start_at_idx]
            month = start_at_str.split()[0].split('/')[1]

            if end_state == "driver cancel" or end_state == "rider cancel":
                if month not in end_state_counts_per_month:
                    end_state_counts_per_month[month] = 0

                end_state_counts_per_month[month] += 1

            if month not in total_trips_per_month:
                total_trips_per_month[month] = 0

            total_trips_per_month[month] += 1

    result = []

    for month, count in end_state_counts_per_month.items():
        cancellation_rate = round(count / total_trips_per_month[month] * 100, 2)
        result.append({'month': month, 'cancellation_rate': cancellation_rate, 'total_trips': total_trips_per_month[month]})

    with open(json_file, 'w') as f:
        json.dump(result, f, indent=4)

    print("JSON generado exitosamente.")

# Cambia los siguientes nombres de archivo según corresponda
csv_file = './src/assets/uber_peru_2010.csv'
json_file = './src/assets/resultados_tasa_cancelacion.json'

create_end_state_json(csv_file, json_file)
