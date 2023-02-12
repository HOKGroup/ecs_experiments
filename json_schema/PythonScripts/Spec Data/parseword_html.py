import os
import glob
import pythoncom
import win32com.client
import win32api

def convert_to_html(word_file):
    try:
        # Connect to Word in headless mode
        pythoncom.CoInitialize()
        word = win32com.client.DispatchEx('Word.Application')
        word.Visible = True

        # Open the Word document
        doc = word.Documents.Open(word_file)

        # Save the document as HTML
        html_file = os.path.splitext(word_file)[0] + '.html'
        doc.SaveAs(html_file, FileFormat=win32com.client.constants.wdFormatHTML)

        # Close the document and Word
        doc.Close()
        word.Quit()
    except Exception as e:
        print(f'Error converting {word_file}: {e}')

# Set the folder containing the Word documents
folder = r'S:\Git\ecs_experiments\json_schema\PythonScripts\Spec Data'

# Find all the Word documents in the folder
word_files = glob.glob(os.path.join(folder, '*.docx'))

# Convert each Word document to HTML
for word_file in word_files:
    convert_to_html(word_file)
