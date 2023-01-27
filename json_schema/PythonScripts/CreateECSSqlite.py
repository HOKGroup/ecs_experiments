import sqlite3
from sqlite3 import Error


def create_connection(db_file):
    """ create a database connection to the SQLite database
        specified by db_file
    :param db_file: database file
    :return: Connection object or None
    """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except Error as e:
        print(e)

    return conn


def create_table(conn, create_table_sql):
    """ create a table from the create_table_sql statement
    :param conn: Connection object
    :param create_table_sql: a CREATE TABLE statement
    :return:
    """
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
    except Error as e:
        print(e)

def main():
    database = r"S:\Git\ecs_experiments\json_schema\PythonScripts\ecs.db"

    sql_create_entity_table = """ CREATE TABLE IF NOT EXISTS entity (
                                        entity_guid integer PRIMARY KEY AUTOINCREMENT,
                                        classification text NOT NULL,
                                        classification_reference text,
                                        context text,
                                        creation_date text
                                    ); """

    sql_create_component_table = """CREATE TABLE IF NOT EXISTS component (
                                        component_guid integer PRIMARY KEY AUTOINCREMENT,
                                        context text,
                                        component_name text,
                                        component_id text,
                                        entity_guid text,
                                        entity_classification text,
                                        component_type text,
                                        component_type_referenece text,
                                        component_payload_type text,
                                        owner text,
                                        version integer,
                                        status text,
                                        active integer,
                                        creation_date text,
                                        authoring_application text,
                                        hash1 text,
                                        schema text,
                                        payload blob,
                                        FOREIGN KEY (entity_guid) REFERENCES entity (entity_guid)
                                    );"""
    
    sql_create_relationship_table = """CREATE TABLE IF NOT EXISTS relationship (
                                        relationship_guid integer PRIMARY KEY AUTOINCREMENT,
                                        context text
                                    );"""
    
    sql_create_layer_table = """CREATE TABLE IF NOT EXISTS layer (
                                        layer_guid integer PRIMARY KEY AUTOINCREMENT,
                                        context text
                                    );"""
    
    sql_create_scene_table = """CREATE TABLE IF NOT EXISTS scene (
                                        scene_guid integer PRIMARY KEY AUTOINCREMENT,
                                        context text
                                    );"""

    # create a database connection
    conn = create_connection(database)

    # create tables
    if conn is not None:
        # create projects entity
        create_table(conn, sql_create_entity_table)

        # create tasks component
        create_table(conn, sql_create_component_table)

        # create tasks table
        create_table(conn, sql_create_relationship_table)

        # create tasks table
        create_table(conn, sql_create_layer_table)

        # create tasks table
        create_table(conn, sql_create_scene_table)
    else:
        print("Error! cannot create the database connection.")


if __name__ == '__main__':
    main()