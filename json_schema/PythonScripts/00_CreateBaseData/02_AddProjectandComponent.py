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
        enitity = ('Project', 'http...', 'hok-project-active', '20220403');
        entity_guid = create_entity(conn, enitity)

        # component project.details
        component1 = ('hok-project-active', "$Project Name Goes here$","1231312.00", entity_guid, 'Project', 'project.details', 'http...', 'json', 'HOK' ,0 ,'on track', 1, '20220403' , 'Project App' ,'some hash' ,'project.details.v01', '{"ProjectName" : "My Project", "ProjectNameAlias" : "fox bannana grass", "ProjectNumber": "1231312.00", "UniqueID" : "2121212121", "AdminLocation" : "LA"}')

        # component project.location.polygon
        component2 = ('hok-project-active', "Legal Site Boundry","1231312.00", entity_guid, 'Project', 'project.location.polygon', 'http...', 'geojson', 'HOK' ,0 ,'Surveyed', 1, '20220403' , 'Mapping App' ,'some hash' ,'project.location.polygon.v01', '{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"coordinates":[[[-119.69575654897366,34.42077299472784],[-119.69645693125482,34.42011949900281],[-119.69609819886695,34.41988698716244],[-119.69540849314501,34.420524631724675],[-119.69575654897366,34.42077299472784]]],"type":"Polygon"}}]}')

        # component project.group1
        component3 = ('hok-project-active', "HOK Regular Staff","001", entity_guid, 'Project', 'project.group', 'http...', 'json', 'HOK' ,0 ,'Standard Group', 1, '20220403' , 'Project App' ,'some hash' ,'project.group.v01', '{"GroupName" : "HOK Regular Staff", "UniqueID" : "001"}')

         # component project.group2
        component4 = ('hok-project-active', "HOK Admins","002", entity_guid, 'Project', 'project.group', 'http...', 'json', 'HOK' ,0 ,'Standard Group', 1, '20220403' , 'Project App' ,'some hash' ,'project.group.v01', '{"GroupName" : "Admins", "UniqueID" : "002"}')

         # component project.group3
        component5 = ('hok-project-active', "External Structual Team","003", entity_guid, 'Project', 'project.group', 'http...', 'json', 'HOK' ,0 ,'Standard Group', 1, '20220403' , 'Project App' ,'some hash' ,'project.group.v01', '{"GroupName" : "External Structure", "UniqueID" : "003"}')


        # create componnet
        create_component(conn, component1)
        create_component(conn, component2)
        create_component(conn, component3)
        create_component(conn, component4)
        create_component(conn, component5)


if __name__ == '__main__':
    main()