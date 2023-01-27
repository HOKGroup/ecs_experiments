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
        enitity = ('Company', 'http...', 'http:Some Company URL', '20200405');
        entity_guid = create_entity(conn, enitity)

        # component - Company.Details
        component1 = ('http:Some Company URL', "$Company Name Goes Here$","", entity_guid, 'Company', 'company.details', 'http...', 'json', 'My Company Name' ,0 ,'resently moved', 1, '20010403' , 'NA' ,'some hash' ,'project.details.v01', '{"CompanyName" : "My Company", "Company Acronym" : "MCN", "UniqueID" : "313131313131"}')
        
        # component - Company.Location
        component2 = ('http:Some Company URL', "$Company Locaton Name Goes Here$","", entity_guid, 'Company', 'company.location.details', 'http...', 'json', 'Santa Barbara Location' ,2 ,'Newly Updated', 1, '20210101' , 'NA' ,'some hash' ,'project.location.v01', '{"LocationName" : "Santa Barbara", "LocationAllias" : "North LA", "Address1" : "1234 Coast Street", "Address2" : "Suite1", "City" : "Santa Barbara", "State" : "CA", "Postal Code" : "97858", "UniqueID" : "414141414141", "AdminLocation" : "LA"}')
        
        # create componnet
        create_component(conn, component1)
        create_component(conn, component2)



if __name__ == '__main__':
    main()