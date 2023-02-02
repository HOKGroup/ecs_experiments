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
        
        # component - Company.Location.details
        component2 = ('http:Some Company URL', "$Company Locaton Name Goes Here$","", entity_guid, 'Company', 'company.location.details', 'http...', 'json', 'Santa Barbara Location' ,2 ,'Newly Updated', 1, '20210101' , 'NA' ,'some hash' ,'project.location.v01', '{"LocationName" : "Santa Barbara", "LocationAllias" : "North LA", "Address1" : "1234 Coast Street", "Address2" : "Suite1", "City" : "Santa Barbara", "State" : "CA", "Postal Code" : "97858", "UniqueID" : "414141414141", "AdminLocation" : "LA"}')

        # component Company.Location.point
        component3 = ('Some Company Address', "Address Point on Map","1231312.00", entity_guid, 'company', 'project.location.point', 'http...', 'geojson', 'HOK' ,0 ,'Surveyed', 1, '20220403' , 'Mapping App' ,'some hash' ,'project.location.point.v01', '{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"coordinates":[[[-119.69575654897366,34.42077299472784],[-119.69645693125482,34.42011949900281],[-119.69609819886695,34.41988698716244],[-119.69540849314501,34.420524631724675],[-119.69575654897366,34.42077299472784]]],"type":"Polygon"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[-119.5951085481465,34.43417862651167],"type":"Point"}}]}')
        
        
        # create componnet
        create_component(conn, component1)
        create_component(conn, component2)
        create_component(conn, component3)


if __name__ == '__main__':
    main()