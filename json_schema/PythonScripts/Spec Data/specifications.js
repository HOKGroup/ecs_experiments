{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Word Document Schema",
    "type": "object",
    "properties": {
        "document_structure": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "heading_level": {
                        "type": "integer"
                    },
                    "heading_text": {
                        "type": "string"
                    },
                    "paragraph_text": {
                        "type": "string"
                    },
                    "paragraph_text_type": {
                        "type": "string",
                        "enum": [
                            "Notes to Editor",
                            "East Coast Projects"
                        ]
                    }
                },
                "required": [
                    "heading_level",
                    "heading_text",
                    "paragraph_text",
                    "paragraph_text_type"
                ]
            }
        }
    },
    "required": [
        "document_structure"
    ]
}
