import sqlite3
from sqlite3 import Error
import random
import string

"""
def get_random_string(length):
    # choose from all lowercase letter
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    print("Random string of length", length, "is:", result_str)
    
    randomstring = get_random_string(10)
"""

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


def create_entity(conn, entity):
    """
    Create a new entity into the entity table
    :param conn:
    :param entity:
    :return: entitycreate
    """
    sql = ''' INSERT INTO entity(classification,classification_reference,context,creation_date)
              VALUES(?,?,?,?) '''
    cur = conn.cursor()
    cur.execute(sql, entity)
    conn.commit()
    return cur.lastrowid


def create_component(conn, component):
    """
    Create a new component
    :param conn:
    :param component:
    :return: 
    """

    sql = ''' INSERT INTO component(context,component_name,component_id,entity_guid,entity_classification,component_type,component_type_referenece,component_payload_type,owner,version,status,active,creation_date,authoring_application,hash1,schema,payload)
              VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) '''
    cur = conn.cursor()
    cur.execute(sql, component)
    conn.commit()
    return cur.lastrowid


def main():
    database = r"S:\Git\ecs_experiments\json_schema\PythonScripts\ecs.db"


    # create a database connection
    conn = create_connection(database)
    with conn:
        # create a new entity
        enitity = ('Person', 'http...', 'hok-staff-active', '20220403');
        entity_guid = create_entity(conn, enitity)

        # component
        component1 = ('hok-staff-active', "$random string goes here$","1", entity_guid, 'Person', 'person.details', 'http...', 'json', 'HOK' ,0 ,'looking good', 1, '20220403' , 'HOK People APP' ,'jdjdjdjdjd' ,'person.details.v01', '{"FirstName" : "Greg", "LastName" : "Schleusner", "Email": "greg.schleusner@firm.com", "UniqueID" : "1010101010101010"}')

        # create componnet
        create_component(conn, component1)



if __name__ == '__main__':
    main()