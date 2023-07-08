import csv
import json
from datetime import datetime, timedelta

def calculate_average_acceptance_interval(csv_file, json_file):
    driver_intervals = {}

    with open(csv_file, 'r') as f:
        reader = csv.reader(f, delimiter=';')
        headers = next(reader)

        driver_id_idx = headers.index('driver_id')
        start_at_idx = headers.index('start_at')

        for row in reader:
            driver_id = row[driver_id_idx]
            start_at_str = row[start_at_idx]

            if driver_id not in driver_intervals:
                driver_intervals[driver_id] = []

            if start_at_str:
                start_at = datetime.strptime(start_at_str, '%d/%m/%Y %H:%M')
                driver_intervals[driver_id].append(start_at)

    driver_average_intervals = {}

    for driver_id, intervals in driver_intervals.items():
        intervals.sort(reverse=True)
        num_intervals = len(intervals)
        total_interval = timedelta()

        if num_intervals > 1:
            for i in range(1, num_intervals):
                interval = intervals[i-1] - intervals[i]
                total_interval += interval

            average_interval = total_interval / (num_intervals - 1)
        else:
            average_interval = timedelta()

        average_interval_hours = average_interval.total_seconds() / 3600

        if average_interval_hours <= 72:
            driver_average_intervals[driver_id] = round(average_interval_hours, 2)

    overall_average_interval = sum(driver_average_intervals.values()) / len(driver_average_intervals)

    result = {
        "driver_average_intervals": driver_average_intervals,
        "overall_average_interval": round(overall_average_interval, 2)
    }

    with open(json_file, 'w') as f:
        json.dump(result, f, indent=4)

    print("JSON generado exitosamente.")


# Cambia los siguientes nombres de archivo según corresponda
csv_file = './src/assets/uber_peru_2010.csv'
json_file = './src/assets/intervalo_chofer.json'

calculate_average_acceptance_interval(csv_file, json_file)



