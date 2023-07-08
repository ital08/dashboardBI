import csv
import json
from datetime import datetime

def calculate_average_service_interval(csv_file, json_file):
    service_intervals = []

    with open(csv_file, 'r') as f:
        reader = csv.reader(f, delimiter=';')
        headers = next(reader)

        accepted_time_idx = headers.index('start_at')

        sorted_rows = sorted(reader, key=lambda row: datetime.strptime(row[accepted_time_idx], '%d/%m/%Y %H:%M'))

        previous_time = None

        for row in sorted_rows:
            accepted_time_str = row[accepted_time_idx]
            accepted_time = datetime.strptime(accepted_time_str, '%d/%m/%Y %H:%M')

            if previous_time is not None:
                interval = (accepted_time - previous_time).total_seconds() / 60  # Intervalo en minutos
                service_intervals.append(interval)

            previous_time = accepted_time

    average_interval = sum(service_intervals) / len(service_intervals) if len(service_intervals) > 0 else 0

    result = {
        'average_interval': average_interval
    }

    with open(json_file, 'w') as f:
        json.dump(result, f, indent=4)

    print("JSON generado exitosamente.")

# Cambia los siguientes nombres de archivo según corresponda
csv_file = './src/assets/uber_peru_2010.csv'
json_file =  './src/assets/intervalo.json'

calculate_average_service_interval(csv_file, json_file)
