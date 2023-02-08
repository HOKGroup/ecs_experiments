import sqlite3
import json

def insert_values_into_db(table_name, *values, json_column=None):
    conn = sqlite3.connect('your_database.db')
    c = conn.cursor()
    
    # Create the table if it doesn't exist
    c.execute(f"CREATE TABLE IF NOT EXISTS {table_name} ({','.join(['col_' + str(i) + ' text' for i in range(len(values))])}, json_col text)")
    
    # Insert the values into the table
    if json_column:
        c.execute(f"INSERT INTO {table_name} VALUES ({','.join(['?' for i in range(len(values))])}, ?)", (*values, json.dumps(json_column)))
    else:
        c.execute(f"INSERT INTO {table_name} VALUES ({','.join(['?' for i in range(len(values))])})", (*values,))
    
    conn.commit()
    conn.close()

# Sample data
table_name = "sample_table"
values = ("value1", "value2", "value3")
json_column = {"key1": "value1", "key2": "value2"}

# Insert sample data into the database
insert_values_into_db(table_name, *values, json_column=json_column)
