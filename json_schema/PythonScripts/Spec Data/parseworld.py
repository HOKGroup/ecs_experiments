import docx
import os
import json

# Define the input folder
folder = "S:\\Git\\ecs_experiments\\json_schema\\PythonScripts\\Spec Data"

# Loop through each file in the folder
for filename in os.listdir(folder):
    # Check if the file is a Word document
    if filename.endswith(".docx"):
        # Load the Word document
        document = docx.Document(os.path.join(folder, filename))

        # Initialize the structure array
        structure = []

        # Keep track of the current heading level
        current_heading_level = None

        # Loop through each paragraph in the document
        for i, paragraph in enumerate(document.paragraphs):
            # Determine the heading level
            heading_level = None
            if paragraph.style.name.startswith("Heading"):
                heading_level = int(paragraph.style.name[7:])
                current_heading_level = heading_level

            # Get the heading text
            heading_text = None
            if heading_level is not None:
                heading_text = paragraph.text

            # Get the paragraph text
            paragraph_text = None
            if heading_level is None:
                paragraph_text = paragraph.text

            # Determine the paragraph text type
            paragraph_text_type = None
            if "Notes to Editor" in paragraph.text:
                paragraph_text_type = "Notes to Editor"
            elif "East Coast Projects" in paragraph.text:
                paragraph_text_type = "East Coast Projects"

            # Add the structure object to the structure array
            structure.append({
                "heading_level": current_heading_level,
                "heading_text": heading_text,
                "paragraph_text": paragraph_text,
                "paragraph_text_type": paragraph_text_type
            })

        # Export the structure array to JSON
        data = {
            "document_structure": structure
        }
        with open(os.path.join(folder, os.path.splitext(filename)[0] + ".json"), "w") as f:
            json.dump(data, f, indent=4)
