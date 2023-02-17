import jsonschema
import json
import uuid
from datetime import datetime
import os

# Define the output folder
output_folder = "json_schema\\Entity and Component Definitions\\Sample Data\\Entities"

# Create the output folder if it doesn't exist
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# Define the JSON schema
schema = {
    "$schema": "http://json-schema.org/schema#",
    "version": "V0.01",
    "data_format": "json",
    "title": "entity",
    "type": "object",
    "properties": {
      "entity_guid": {
        "type": "string",
        "description": "URI or Globally Unique ID",
        "format":"uuid_entity"
      },
      "context": {
        "type": "string",
        "description": "Container location where the data is stored ",
        "hidden": "true"
      },
      "context_id": {
        "type": "string",
        "description": "Unique Identifier of a context that this data belongs, a project, enterprise, ect. ",
        "hidden": "true"
      },
      "entity_classification": {
        "type": "string",
        "description": "Classification of the object",
        "enum": [
          "person",
          "project",
          "company",
          "service",
          "submital",
          "rfi",
          "issue",
          "skill"
        ]
      },
      "entity_classification_reference": {
        "type": "string",
        "description": "Reference to the version and location of the definition of the entity; can be local or URI etc",
        "hidden": "true",
        "format": "uri-reference"
      },
      "creation_date": {
        "type": "string",
        "description": "Date that this version of the entity was created",
        "format": "date-time"
      }
    },
    "required": [
      "entity_guid",
      "entity_classification",
      "context",
      "context_id",
      "creation_date"
    ]
}

# Generate 5 sample datasets for each entity classification
for classification in schema["properties"]["entity_classification"]["enum"]:
    classification_folder = f"{output_folder}\\{classification}"
    # Create the classification subfolder if it doesn't exist
    if not os.path.exists(classification_folder):
        os.makedirs(classification_folder)

    for i in range(5):
        # Generate a UUID4 value for the entity_guid field
        entity_guid = str(uuid.uuid4())

        # Generate the creation_date field as an ISO-formatted timestamp
        creation_date = datetime.utcnow().isoformat()

        # Create the entity object with the generated fields
        entity = {
            "entity_guid": entity_guid,
            "context": "sample context",
            "context_id": "sample context id",
            "entity_classification": classification,
            "entity_classification_reference": "sample reference",
            "creation_date": creation_date
        }

        # Validate the entity object against the schema
        jsonschema.validate(instance=entity, schema=schema)

        # Define the output filename
        filename = f"{classification_folder}\\{entity_guid}.json"

        # Write the entity object to the output file
        with open(filename, "w") as f:
            f.write(json.dumps(entity, indent=2))
