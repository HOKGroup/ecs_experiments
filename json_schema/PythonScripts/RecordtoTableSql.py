import sqlite3
import random
import string
import uuid

# Function to generate random string of given length
def random_string(length):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(length))

# Connect to a new SQLite database to store the sample table
conn = sqlite3.connect('sample_table.db')

# Create a new table called "Component"
create_table_query = '''CREATE TABLE Component (
                            ID  TEXT PRIMARY KEY,
                            EntityGUID,
                            PropertyName TEXT,
                            PropertyValue TEXT
                        );'''
conn.execute(create_table_query)

# Prepare data to be inserted
data = []
entity_guid = str(uuid.uuid4())
for i in range(100):
    data.append((entity_guid, 'ComponentGUID', random_string(100)))
    data.append((entity_guid, 'Context', random_string(100)))
    data.append((entity_guid, 'EntityClassification', random_string(100)))
    data.append((entity_guid, 'ComponentUserName', random_string(100)))
    data.append((entity_guid, 'ComponentUserID', random_string(100)))
    data.append((entity_guid, 'ComponentType', random_string(100)))
    data.append((entity_guid, 'ComponentTypeReference', random_string(100)))
    data.append((entity_guid, 'ComponentVersion', random_string(100)))
    data.append((entity_guid, 'ComponentStatus', random_string(100)))
    data.append((entity_guid, 'AuthorSoftware', random_string(100)))
    data.append((entity_guid, 'Hash1', random_string(100)))
    data.append((entity_guid, 'PayloadDataType', random_string(100)))
    data.append((entity_guid, 'Active', random_string(100)))
    data.append((entity_guid, 'DateCreated', random_string(100)))

# Insert data into the database
insert_data_query = '''INSERT INTO Component (EntityGUID, PropertyName, PropertyValue) VALUES (?, ?, ?);'''
conn.executemany(insert_data_query, data)
conn.commit()

# Close the database connection
conn.close()
