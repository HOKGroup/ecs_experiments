import requests

# Replace with your Autodesk Forge API key
api_key = "DEYEOQQ3xDQVAa30UJsAtKGOGQPPHnpH"

# Endpoint to create a new project
endpoint = "https://developer.api.autodesk.com/project/v1/hubs/bda2ea95-2848-4a41-8cae-b8f7fe30a619/projects"

# Request headers
headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {api_key}"
}

# Request body
data = {
    "data": {
        "attributes": {
            "name": "My New Project"
        },
        "type": "projects"
    }
}

# Send the request to create the project
response = requests.post(endpoint, headers=headers, json=data)

# Check if the project was created successfully
if response.status_code == 201:
    print("Project created successfully")
else:
    print(f"Failed to create project. Status code: {response.status_code}")
