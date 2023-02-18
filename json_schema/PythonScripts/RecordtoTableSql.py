import sqlite3
import random
import string

# Function to generate random string of given length
def random_string(length):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(length))

# Connect to a new SQLite database to store the sample table
conn = sqlite3.connect('sample_table.db')

# Create a new table called "Component"
create_table_query = '''CREATE TABLE Component (
                            ID INTEGER PRIMARY KEY,
                            PropertyName TEXT,
                            PropertyValue TEXT
                        );'''
conn.execute(create_table_query)

# Insert 1000 rows with random text using 100 characters for each value
insert_data_query = '''INSERT INTO Component (PropertyName, PropertyValue) VALUES (?, ?);'''
data = []
for i in range(500000):
    data.append(('ComponentGUID', random_string(100)))
    data.append(('Context', random_string(100)))
    data.append(('EntityGUID', random_string(100)))
    data.append(('EntityClassification', random_string(100)))
    data.append(('ComponentUserName', random_string(100)))
    data.append(('ComponentUserID', random_string(100)))
    data.append(('ComponentType', random_string(100)))
    data.append(('ComponentTypeReference', random_string(100)))
    data.append(('ComponentVersion', random_string(100)))
    data.append(('ComponentStatus', random_string(100)))
    data.append(('AuthorSoftware', random_string(100)))
    data.append(('Hash1', random_string(100)))
    data.append(('PayloadDataType', random_string(100)))
    data.append(('Active', random_string(100)))
    data.append(('DateCreated', random_string(100)))

conn.executemany(insert_data_query, data)

# Commit changes and close the database connection
conn.commit()
conn.close()
