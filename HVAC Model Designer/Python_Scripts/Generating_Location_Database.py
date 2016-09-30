import csv
import json

with open('cities.csv', 'r') as csvfile:
    exampleReader = csv.reader(csvfile)
    data = []
    for row in exampleReader:
        row_data = []
        for col in row:
            row_data.append(col)
        print("Row # {0}".format(str(row)))
        data.append(row_data)
    with open('location_data.json', 'w') as f:
        json.dump(data, f)

with open('location_data.json', 'r') as f:
    data = json.load(f)
    for row in data:
        print("Row # {0}".format(str(row)))
