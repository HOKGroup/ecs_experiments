import sqlite3
import tkinter as tk
from tkinter import ttk

def submit():
    # Get the selected table and values from the comboboxes
    table_selected = table_var.get()
    table_value = table_combo.get()
    foreign_table_value = foreign_table_combo.get()
    
    # Connect to the SQLite database
    conn = sqlite3.connect("database.db")
    c = conn.cursor()
    
    # Execute the SQL statement to create the foreign key relationship
    c.execute(f"ALTER TABLE {table_selected} ADD COLUMN {table_selected}_id INTEGER REFERENCES {table_selected}(id)")
    c.execute(f"UPDATE {table_selected} SET {table_selected}_id = (SELECT id FROM {table_selected} WHERE value = ?) WHERE value = ?", (table_value, foreign_table_value))
    
    # Commit the changes and close the connection
    conn.commit()
    conn.close()
    
    # Show a success message
    success_label.config(text="Foreign key relationship created successfully")

# Create the main window
root = tk.Tk()
root.title("Create Foreign Key Relationship")

# Connect to the SQLite database
conn = sqlite3.connect("database.db")
c = conn.cursor()

# Get the tables
c.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = [row[0] for row in c.fetchall()]

# Close the connection
conn.close()

# Create the combobox for the tables
table_var = tk.StringVar()
table_var.set(tables[0])
table_combo = ttk.Combobox(root, values=tables, textvariable=table_var)
table_combo.grid(row=0, column=0, columnspan=2)

# Create the combobox for the first table
table_selected = table_var.get()
conn = sqlite3.connect("database.db")
c = conn.cursor()
c.execute(f"SELECT value FROM {table_selected}")
table_values = [row[0] for row in c.fetchall()]
conn.close()
table_combo = ttk.Combobox(root, values=table_values)
table_combo.grid(row=1, column=0)

# Create the combobox for the second table
foreign_table_combo = ttk.Combobox(root, values=table_values)
foreign_table_combo.grid(row=1, column=1)

# Create the submit button
submit_button = tk.Button(root, text="Submit", command=submit)
submit_button.grid(row=2, column=0, columnspan=2, pady=10)

# Create the success label
success_label = tk.Label(root, text="")
success_label.grid(row=3, column=0, columnspan=2)

# Start the main event loop
root.mainloop()