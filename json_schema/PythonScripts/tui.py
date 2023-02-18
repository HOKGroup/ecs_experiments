import curses
import json

# Load JSON schema file
with open('json_schema\Entity and Component Definitions\person.details.json', 'r') as schema_file:
    schema = json.load(schema_file)

# Initialize curses screen
screen = curses.initscr()
curses.start_color()
curses.use_default_colors()

# Define colors
curses.init_pair(1, curses.COLOR_WHITE, -1)
curses.init_pair(2, curses.COLOR_BLACK, curses.COLOR_WHITE)

# Set cursor visibility
curses.curs_set(1)

# Set up screen
screen.clear()
screen.addstr("Label Generator", curses.A_BOLD)
screen.addstr("\n\n")

# Initialize dictionary to hold input fields
input_fields = {}

# Loop through schema and generate labels and input fields
for i, key in enumerate(schema):
    screen.addstr(key + ": ", curses.color_pair(1))
    screen.addstr(str(schema[key]), curses.color_pair(2))
    screen.addstr("\n")
    input_fields[key] = curses.newwin(1, 20, i + 2, len(schema) + 2)
    input_fields[key].bkgd(' ', curses.color_pair(2))
    input_fields[key].refresh()

# Move cursor to start of first input field
input_fields[list(schema.keys())[0]].move(0, 0)
curses.curs_set(1)

# Loop through schema and allow user to input values
for key in schema:
    value = input_fields[key].getstr().decode('utf-8')
    schema[key] = value
    input_fields[key].clear()
    input_fields[key].addstr(value)
    input_fields[key].refresh()

# Export updated schema to new JSON file
with open('updated_schema.json', 'w') as updated_schema_file:
    json.dump(schema, updated_schema_file)

# Close curses screen
curses.endwin()
