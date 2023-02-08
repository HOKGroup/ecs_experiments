def create_message(name, email, discipline, role, project):
    discipline_code = 0
    role_code = 0
    if discipline == "Computer Science":
        discipline_code = 1
    elif discipline == "Mathematics":
        discipline_code = 2
    if role == "Student":
        role_code = 1
    elif role == "Lecturer":
        role_code = 2
    
    code = str(discipline_code) + str(role_code)
    
    return code

# Example usage
response_code = create_message("John Doe", "johndoe@example.com", "Computer Science", "Student", "Artificial Intelligence")
print(response_code)
