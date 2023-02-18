
                # If the property has an enum, create a dropdown list box
                if "enum" in options:
                    field = tk.StringVar(value=options["default"] if "default" in options else "")
                    dropdown = tk.OptionMenu(frame, field, *options["enum"],)
                    dropdown.pack()