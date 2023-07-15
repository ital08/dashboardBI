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
                month = start_at.strftime('%m')
                month_name = start_at.strftime('%B')

                driver_intervals[driver_id].append((start_at, month, month_name))

    average_intervals_per_month = {}

    for driver_id, intervals in driver_intervals.items():
        intervals.sort(key=lambda x: x[0])
        num_intervals = len(intervals)
        total_interval = timedelta()

        if num_intervals > 1:
            for i in range(1, num_intervals):
                interval = intervals[i][0] - intervals[i-1][0]
                total_interval += interval

            average_interval = total_interval / (num_intervals - 1)
        else:
            average_interval = timedelta()

        average_interval_hours = average_interval.total_seconds() / 3600

        for interval in intervals:
            month = interval[1]
            month_name = interval[2]
            if month not in average_intervals_per_month:
                average_intervals_per_month[month] = []

            average_intervals_per_month[month].append((month_name, average_interval_hours))

    average_intervals = {}

    for month, intervals in average_intervals_per_month.items():
        average_interval_month = sum(interval[1] for interval in intervals) / len(intervals)
        average_intervals[month] = {
            "month": intervals[0][0],  # El nombre del mes es el mismo para todos los intervalos de ese mes
            "average_interval": round(average_interval_month, 2)
        }

    result = {
        "average_intervals_per_month": average_intervals
    }

    with open(json_file, 'w') as f:
        json.dump(result, f, indent=4)

    print("JSON generado exitosamente.")

# Cambia los siguientes nombres de archivo según corresponda
csv_file = './src/assets/uber_peru_2010.csv'
json_file = './src/assets/intervalo_promedio_mes.json'

calculate_average_acceptance_interval(csv_file, json_file)
