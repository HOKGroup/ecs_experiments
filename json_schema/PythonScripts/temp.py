# If the property is an IFC file, show a file browse option
if options["type"] == "string" and options.get("format") == "ifc":
    field = tk.Text(frame, height=10, width=50)
    field.pack()

    def browse_file():
        file_path = filedialog.askopenfilename(initialdir="/", title="Select file",
                                               filetypes=(("IFC files", "*.ifc"), ("all files", "*.*")))
        if file_path:
            with open(file_path, "r") as f:
                data = f.read()
                field.delete(1.0, tk.END)
                field.insert(tk.END, data)

    browse_button = tk.Button(master, text="Browse", command=browse_file)
    browse_button.pack()
