import json
import os
from typing import List, Dict

def parse_express_file(file_path: str) -> List[Dict]:
    """Parses an IFC file using EXPRESS encoding and returns a list of dictionaries,
    where each dictionary represents an object in the file and its properties.
    """
    objects = []
    # Add your logic to parse the file and extract objects and their properties here
    # ...

    return objects

def save_objects_to_json(objects: List[Dict], output_dir: str, file_name: str):
    """Saves each object in the list to a separate JSON file in the specified output directory.
    """
    for i, obj in enumerate(objects):
        obj_name = obj.get("name", f"object_{i}")
        with open(f"{output_dir}/{file_name}_{obj_name}.json", "w") as f:
            json.dump(obj, f)

if __name__ == "__main__":
    input_dir = "S:/Git/ecs_experiments/json_schema/PythonScripts/IFC"
    output_dir = "S:/Git/ecs_experiments/json_schema/PythonScripts/IFC"

    for file_name in os.listdir(input_dir):
        if file_name.endswith(".ifc"):
            express_file_path = f"{input_dir}/{file_name}"
            objects = parse_express_file(express_file_path)
            save_objects_to_json(objects, output_dir, file_name)
