import tkinter as tk
import json
import os
import uuid
from datetime import datetime
import random

class CompanyDetailsForm:
    def __init__(self, master):
        self.master = master
        self.master.title("Company Details Form")

        self.schema_files = {
            "entity": "json_schema/Entity and Component Definitions/entity.json",
            "component": "json_schema/Entity and Component Definitions/component.json",
            "payload": "json_schema\Entity and Component Definitions\project.ifc.full.json"
        }

        self.schemas = {}
        for name, filename in self.schema_files.items():
            with open(filename, "r") as f:
                self.schemas[name] = json.load(f)

        self.forms = {}
        for name, schema in self.schemas.items():
            frame = tk.LabelFrame(master, text=schema["title"])
            frame.pack(padx=10, pady=10, fill="both", expand=True)

            fields = {}
            for prop, options in schema["properties"].items():
                if "hidden" in options and options["hidden"]:
                    continue

                label = tk.Label(frame, text=options["description"])
                label.pack()

                # If the property has an enum, create a dropdown list box
                if "enum" in options:
                    field = tk.StringVar(value=options["default"] if "default" in options else "")
                    dropdown = tk.OptionMenu(frame, field, *options["enum"])
                    dropdown.pack()
                # If the property is an array, create a multiline text box
                elif options["type"] == "array":
                    field = tk.Text(frame, height=5, width=30)
                    field.pack()
                # If the property is a date-time, show the date and time
                elif options["type"] == "string" and options.get("format") == "date-time":
                    field = tk.Entry(frame)
                    field.pack()

                    current_date_time = datetime.now()
                    field.insert(0, current_date_time)

                # If the property is sequence name
                elif options["type"] == "string" and options.get("format") == "squence_name":
                    field = tk.Entry(frame)
                    field.pack()

                    sequence_name = result_str = ''.join((random.choice('abcdxyzpqr') for i in range(5)))
                    field.insert(0, sequence_name)
                
                                # If the property is sequence number
                elif options["type"] == "string" and options.get("format") == "squence_number":
                    field = tk.Entry(frame)
                    field.pack()

                    sequence_number = random.randint(1, 10)
                    field.insert(0, sequence_number)

                # If the property is a UUID entity then insert UUID
                elif options["type"] == "string" and options.get("format") == "uuid_entity":
                    field = tk.Entry(frame)
                    field.pack()

                    uuid_ent = uuid.uuid4()
                    field.insert(0, uuid_ent)

                # If the property is a UUID component then insert UUID
                elif options["type"] == "string" and options.get("format") == "uuid_component":
                    field = tk.Entry(frame)
                    field.pack()

                    uuid_comp = uuid.uuid4()
                    field.insert(0, uuid_comp)

                # If the property is a UUID_component_entity enter the UUID of the Entity
                elif options["type"] == "string" and options.get("format") == "uuid_component_entity":
                    field = tk.Entry(frame)
                    field.pack()

                    uuid_ent_comp = uuid_ent
                    field.insert(0, uuid_ent_comp)

                # If the property is an "text file"
                elif options["type"] == "string" and options.get("format") == "text":
                    field = tk.Text(frame, height=10, width=200)
                    field.pack()

                else:
                    field = tk.Entry(frame)
                    field.pack()

                fields[prop] = field

            self.forms[name] = fields

        # Create the "Save" button
        save_button = tk.Button(master, text="Save", command=self.save_data)
        save_button.pack()


    def save_data(self):
        for name, schema in self.schemas.items():
            # Collect the data from the form fields and create a dictionary
            data = {}
            for prop, field in self.forms[name].items():
                # Convert the text in the array text box to a list
                if isinstance(field, tk.Text):
                    data[prop] = field.get("1.0", "end-1c").split("\n")
                else:
                    data[prop] = field.get()

            # Determine the output file name based on the schema file name
            if name == "payload":
                base_filename = os.path.splitext(os.path.basename(self.schema_files["payload"]))[0]
                output_file = f"{base_filename}_data.json"
            else:
                base_filename = os.path.splitext(os.path.basename(self.schema_files["payload"]))[0]
                output_file = f"{base_filename}_{name}.json"
                
            output_path = os.path.join(os.path.dirname(self.schema_files["payload"]), output_file)

            # Write the data to a JSON file
            with open(output_path, "w") as f:
                json.dump(data, f)

root = tk.Tk()
form = CompanyDetailsForm(root)
root.mainloop()
