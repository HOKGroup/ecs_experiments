import tkinter as tk
import json
import os
import uuid

class CompanyDetailsForm:
    def __init__(self, master):
        self.master = master
        self.master.title("Company Details Form")

        self.schema_files = {
            "entity": "json_schema/Entity and Component Definitions/entity.json",
            "component": "json_schema/Entity and Component Definitions/component.json",
            "payload": "json_schema/Entity and Component Definitions/person.details.json"
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
                else:
                    field = tk.Entry(frame)
                    field.pack()

                fields[prop] = field

            self.forms[name] = fields

        # Create the "Save" button
        save_button = tk.Button(master, text="Save", command=self.save_data)
        save_button.pack()

        # Bind key presses to generate UUIDs
        master.bind("1", lambda event: self.insert_uuid(event, 1))
        master.bind("2", lambda event: self.insert_uuid(event, 2))

    def insert_uuid(self, event, uuid_number):
        uuid_value = str(uuid.uuid4())
        field = self.master.focus_get()
        if isinstance(field, tk.Text):
            field.insert(tk.INSERT, uuid_value)
        elif isinstance(field, tk.Entry):
            current_text = field.get()
            current_cursor_pos = field.index(tk.INSERT)
            field.delete(0, tk.END)
            field.insert(0, current_text[:current_cursor_pos] + uuid_value + current_text[current_cursor_pos:])
            field.icursor(current_cursor_pos + len(uuid_value))

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
