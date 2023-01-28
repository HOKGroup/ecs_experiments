import sqlite3
from sqlite3 import Error
import random
import string


def create_connection(db_file):
    """ create a database connection to the SQLite database
        specified by db_file
    :param db_file: database file
    :return: Connection object or None
    """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Error as e:
        print(e)

    return conn


def create_relationship(conn, relationship):
    """
    Create a new relationship into the relatinship table
    :param conn:
    :param relationship:
    :return: entitycreate
    """
    sql = ''' INSERT INTO relationship(context, relationship_name, relationship_type, relationship_type_reference, relationship_source_entities, relationship_source_components, relationship_destination_entities, relationship_destination_components, active, version, date_created)
              VALUES(?,?,?,?,?,?,?,?,?,?,?) '''
    cur = conn.cursor()
    cur.execute(sql, relationship)
    conn.commit()
    return cur.lastrowid


def main():
    database = r"S:\Git\ecs_experiments\json_schema\PythonScripts\ecs.db"

    
    # create a database connection
    conn = create_connection(database)
    with conn:
        # create a new relationship
        relationship = ('hok-relationships','uses1', 'uses', 'http...', 'null', 'null', 'null', 'null', 1, 1, '20230101');
        relationshipguid = create_relationship(conn, relationship)

if __name__ == '__main__':
    main()