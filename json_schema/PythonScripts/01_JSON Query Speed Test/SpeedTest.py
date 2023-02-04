import sqlite3
import random
import string
import json

def create_table(conn):
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS component (
            col_1 TEXT,
            col_2 TEXT,
            col_3 TEXT,
            col_4 TEXT,
            col_5 TEXT,
            col_6 TEXT,
            col_7 TEXT,
            col_8 TEXT,
            col_9 TEXT,
            col_10 TEXT,
            payload TEXT,
            col_12 TEXT
        )
    """)
    conn.commit()

def insert_data(conn):
    c = conn.cursor()
    payload = {
            "Address1": ''.join(random.choices(string.ascii_letters + string.digits, k=100)),
            "Address2": ''.join(random.choices(string.ascii_letters + string.digits, k=100)),
            "AdminLocation": ''.join(random.choices(string.ascii_letters + string.digits, k=100)),
            "City": ''.join(random.choices(string.ascii_letters + string.digits, k=100)),
            "LocationAllias": ''.join(random.choices(string.ascii_letters + string.digits, k=100)),
            "LocationName": ''.join(random.choices(string.ascii_letters + string.digits, k=100)),
            "Postal Code": ''.join(random.choices(string.ascii_letters + string.digits, k=100)),
            "State": ''.join(random.choices(string.ascii_letters + string.digits, k=100)),
            "UniqueID": ''.join(random.choices(string.ascii_letters + string.digits, k=100)),
        }
    typical_values = [        "value1",        "value2",        "value3",        "value4",        "value5",        "value6",        "value7",        "value8",        "value9",        "value10",        "value11",        "value12",        "value13",        "value14",        "value15"    ]
    for i in range(100):
        c.execute("""
            INSERT INTO component (
                col_1,
                col_2,
                col_3,
                col_4,
                col_5,
                col_6,
                col_7,
                col_8,
                col_9,
                col_10,
                payload,
                col_12
            ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
        """, (
            ''.join(random.choices(string.ascii_letters + string.digits, k=100)),
            ''.join(random.choices(string.ascii_letters + string.digits, k=100)),
            ''.join(random.choices(string.ascii_letters + string.digits, k=100)),
            ''.join(random.choices(string.ascii_letters + string.digits, k=100)),
            ''.join(random.choices(string.ascii_letters + string.digits, k=100)),
            ''.join(random.choices(string.ascii_letters + string.digits, k=100)),
            ''.join(random.choices(string.ascii_letters + string.digits, k=100)),
            ''.join(random.choices(string.ascii_letters + string.digits, k=100)),
            ''.join(random.choices(string.ascii_letters + string.digits, k=100)),
            ''.join(random.choices(string.ascii_letters + string.digits, k=100)),
            json.dumps(payload),
            random.choice(typical_values)
        ))
    conn.commit()

if __name__ == '__main__':
    conn = sqlite3.connect("S:\Git\ecs_experiments\json_schema\PythonScripts\WIP\speedtest.db")
    create_table(conn)
    insert_data(conn)
    conn.close()
