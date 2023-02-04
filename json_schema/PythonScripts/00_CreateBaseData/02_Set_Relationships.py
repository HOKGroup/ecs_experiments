import sqlite3

# Connect to the database file
conn = sqlite3.connect("S:\Git\ecs_experiments\json_schema\PythonScripts\ecs.db")
cursor = conn.cursor()

# Execute the SELECT query to retrieve the component_guid values
query = "SELECT component_guid FROM component WHERE component_type LIKE '%person.details%'"
cursor.execute(query)

# Fetch the results and store them in a list
results = cursor.fetchall()
component_guids = [result[0] for result in results]

# Convert the list of component_guids into a single string
component_guids_str = ", ".join(str(e) for e in component_guids)

# Update the relationship_source_component column in the relationship database
update_query = "UPDATE relationship SET relationship_source_components = ? WHERE relationship_type = 'memberof'"
cursor.execute(update_query, (component_guids_str,))

# Commit the changes to the database
conn.commit()

# Close the database connection
conn.close()
