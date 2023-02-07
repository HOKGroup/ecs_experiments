import sqlite3
import tkinter as tk
from tkinter import ttk

def create_entity(conn, name):
    c = conn.cursor()
    c.execute("INSERT INTO Entity (name) VALUES (?)", (name,))
    return c.lastrowid

def create_component(conn, project_name, user_name):
    c = conn.cursor()
    entity_id = create_entity(conn, project_name)
    user_id = create_entity(conn, user_name)
    c.execute("INSERT INTO Components (project_id, user_id) VALUES (?,?)", (entity_id, user_id))

def on_submit():
    project_name = project_entry.get()
    user_name = user_entry.get()
    create_component(conn, project_name, user_name)
    conn.commit()
    status_label.config(text="Data stored successfully.")

def main():
    global conn
    conn = sqlite3.connect("mydb.sqlite")
    c = conn.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS Entity (id INTEGER PRIMARY KEY, name TEXT)")
    c.execute("CREATE TABLE IF NOT EXISTS Components (id INTEGER PRIMARY KEY, project_id INTEGER, user_id INTEGER, FOREIGN KEY (project_id) REFERENCES Entity(id), FOREIGN KEY (user_id) REFERENCES Entity(id))")

root = tk.Tk()
root.title("Project Management")

mainframe = ttk.Frame(root, padding="3 3 12 12")
mainframe.grid(column=0, row=0, sticky=(tk.N, tk.W, tk.E, tk.S))
mainframe.columnconfigure(0, weight=1)
mainframe.rowconfigure(0, weight=1)

def create_widgets():
    global project_entry, user_entry, status_label

    project_label = ttk.Label(mainframe, text="Project Name:")
    project_label.grid(column=1, row=1, sticky=tk.W)

    project_entry = ttk.Entry(mainframe)
    project_entry.grid(column=2, row=1, sticky=(tk.W, tk.E))

    user_label = ttk.Label(mainframe, text="User Name:")
    user_label.grid(column=1, row=2, sticky=tk.W)

    user_entry = ttk.Entry(mainframe)
    user_entry.grid(column=2, row=2, sticky=(tk.W, tk.E))

    submit_button = ttk.Button(mainframe, text="Submit", command=on_submit)
    submit_button.grid(column=2, row=3, sticky=tk.E)

    status_label = ttk.Label(mainframe, text="")
    status_label.grid(column=2, row=4, sticky=tk.E)

    for child in mainframe.winfo_children(): child.grid_configure(padx=5, pady=5)

create_widgets()

root.mainloop()
conn.close()
