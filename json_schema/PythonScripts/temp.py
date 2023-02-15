# If the property is a date-time, show the date and time
if options["type"] == "string" and options.get("format") == "date-time":
    field = tk.Entry(frame)
    field.pack()

    current_date_time = datetime.datetime.now().isoformat()
    field.insert(0, current_date_time)
