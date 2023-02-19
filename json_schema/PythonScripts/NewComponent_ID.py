import os
import json
import uuid

# Set the path to the folder containing the JSON files
folder_path = r'json_schema\Entity and Component Definitions\Sample Data'

# Iterate through all the files in the folder and its subfolders
for root, dirs, files in os.walk(folder_path):
    for file_name in files:
        if file_name.endswith(".json"):
            file_path = os.path.join(root, file_name)

            # Open the file and load its JSON content
            with open(file_path, "r") as f:
                content = json.load(f)

            # Replace the "component_guid" value with a new UUID4 value
            if 'component_guid' in content:
                content["component_guid"] = str(uuid.uuid4())

            # Write the updated JSON content back to the file
            with open(file_path, "w") as f:
                json.dump(content, f, indent=4)
