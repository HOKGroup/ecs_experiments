import tkinter as tk
import json

def write_to_json():
    data = {
        "ProjectName": project_name.get(),
        "UserName": user_name.get(),
        "Role": role.get(),
        "Discipline": discipline.get()
    }

    with open('S:/Git/ecs_experiments/json_schema/PythonScripts/WIP/person.json', 'w') as file:
        json.dump(data, file)

root = tk.Tk()
root.title("Input Form")

project_name = tk.StringVar()
user_name = tk.StringVar()
role = tk.StringVar()
discipline = tk.StringVar()

project_name_label = tk.Label(root, text="Project Name")
project_name_label.grid(row=0, column=0)
project_name_dropdown = tk.OptionMenu(root, project_name, "Project 1", "Project 2", "Project 3", "Project 4", "Project 5")
project_name_dropdown.grid(row=0, column=1)

user_name_label = tk.Label(root, text="User Name")
user_name_label.grid(row=1, column=0)
user_name_entry = tk.Entry(root, textvariable=user_name)
user_name_entry.grid(row=1, column=1)

role_label = tk.Label(root, text="Role")
role_label.grid(row=2, column=0)
role_dropdown = tk.OptionMenu(root, role, "Role 1", "Role 2", "Role 3", "Role 4", "Role 5")
role_dropdown.grid(row=2, column=1)

discipline_label = tk.Label(root, text="Discipline")
discipline_label.grid(row=3, column=0)
discipline_dropdown = tk.OptionMenu(root, discipline, "Discipline 1", "Discipline 2", "Discipline 3", "Discipline 4", "Discipline 5")
discipline_dropdown.grid(row=3, column=1)

submit_button = tk.Button(root, text="Submit", command=write_to_json)
submit_button.grid(row=4, column=0, columnspan=2, pady=10)

root.mainloop()
