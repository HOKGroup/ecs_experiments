import sqlite3
from sqlite3 import Error
import os

try:
    os.remove("S:\Git\ecs_experiments\json_schema\PythonScripts\ecs.db")
except FileNotFoundError:
    pass

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
                                        context text,
                                        relationship_name text,
                                        relationship_type text,
                                        relationship_type_reference text,
                                        relationship_source_entities text,
                                        relationship_source_components text,
                                        relationship_destination_entities text,
                                        relationship_destination_components text,
                                        active integer,
                                        version integer,
                                        date_created text
                                    );"""
    
    sql_create_layer_table = """CREATE TABLE IF NOT EXISTS layer (
                                        layer_guid integer PRIMARY KEY AUTOINCREMENT,
                                        context text,
                                        layer_name text,
                                        layer_id text,
                                        layer_entities text,
                                        layer_components text,
                                        layer_relationships text,
                                        layer_owner text,
                                        layer_description text,
                                        layer_function text,
                                        layer_update_method text,
                                        active integer,
                                        version integer,
                                        date_created text
                                    );"""
    
    sql_create_scene_table = """CREATE TABLE IF NOT EXISTS scene (
                                        scene_guid integer PRIMARY KEY AUTOINCREMENT,
                                        context text,
                                        scene_name text,
                                        scene_id text,
                                        scene_layers text,
                                        active integer,
                                        version integer,
                                        date_created text
                                    );"""

    sql_create_payload_table = """CREATE TABLE IF NOT EXISTS payload (
                                        payload_guid integer PRIMARY KEY AUTOINCREMENT,
                                        component_guid text,
                                        payload blob,
                                        FOREIGN KEY (component_guid) REFERENCES component (component_guid)
                                    );"""                                   

    # create a database connection
    conn = create_connection(database)

    # create tables
    if conn is not None:
        # create projects entity
        create_table(conn, sql_create_entity_table)

        # create component table
        create_table(conn, sql_create_component_table)

        # create realtionship table
        create_table(conn, sql_create_relationship_table)

        # create layer table
        create_table(conn, sql_create_layer_table)

        # create scene table
        create_table(conn, sql_create_scene_table)

        # create payload table
        create_table(conn, sql_create_payload_table)
    else:
        print("Error! cannot create the database connection.")


if __name__ == '__main__':
    main()