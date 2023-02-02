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
        enitity = ('Service', 'http...', 'hok-services-active', '20220413');
        entity_guid = create_entity(conn, enitity)

        # component service.details
        component1 = ('hok-services-active', "$Service Name goes here$","Serviceid", entity_guid, 'Service', 'service.details', 'http...', 'json', 'HOK' ,0 ,'running', 1, '20220403' , 'Service Manager' ,'some hash' ,'service.details.v01', '{"ServiceName" : "TrimbleConnectSight", "ServiceAcronym" : "TCS", "BaseURL": "http://trimbleconnectsight.com", "UniqueID" : "1231123", "SupportContact" : "person@trimble.com"}')

        # component service.details.project
        component2 = ('hok-services-active', "$Service Name goes here$","ProjectServiceID", entity_guid, 'Service', 'service.details.project.project', 'http...', 'json', 'HOK' ,0 ,'running', 1, '20220403' , 'Service Manager' ,'some hash' ,'service.details.project.v01', '{"ServiceName" : "TrimbleConnectSight", "ServiceAcronym" : "TCS", "ServiceURL": "http://trimbleconnectsight.com/myproject...", "ProjectGUID" : "1231123", "SupportContact" : "person@trimble.com"}')        

        # component service.admin.add_project
        component3 = ('hok-services-active', "$Service Name goes here$","ProjectServiceID", entity_guid, 'Service', 'service.details.project', 'http...', 'json', 'HOK' ,0 ,'running', 1, '20220403' , 'Service Manager' ,'some hash' ,'service.details.v01', '{"ServiceName" : "TrimbleConnectSight", "ServiceAcronym" : "TCS", "BaseURL": "http://trimbleconnectsight.com", "UniqueID" : "1231123", "SupportContact" : "person@trimble.com"}')

        # component service.admin.add_user
        component4 = ('hok-services-active', "$Service Name goes here$","ProjectServiceID", entity_guid, 'Service', 'service.details.project', 'http...', 'json', 'HOK' ,0 ,'running', 1, '20220403' , 'Service Manager' ,'some hash' ,'service.details.v01', '{"ServiceName" : "TrimbleConnectSight", "ServiceAcronym" : "TCS", "BaseURL": "http://trimbleconnectsight.com", "UniqueID" : "1231123", "SupportContact" : "person@trimble.com"}')  

        # component service.user.role1
        component5 = ('hok-project-active', "HOK Regular Staff","001", entity_guid, 'Project', 'project.group', 'http...', 'json', 'HOK' ,0 ,'Standard Group', 1, '20220403' , 'Project App' ,'some hash' ,'project.group.v01', '{"GroupName" : "HOK Regular Staff", "UniqueID" : "001"}')

        # component service.user.role2
        component6 = ('hok-project-active', "HOK Admins","002", entity_guid, 'Project', 'project.group', 'http...', 'json', 'HOK' ,0 ,'Standard Group', 1, '20220403' , 'Project App' ,'some hash' ,'project.group.v01', '{"GroupName" : "Admins", "UniqueID" : "002"}')

        # component service.user.role3
        component7 = ('hok-project-active', "External Structual Team","003", entity_guid, 'Project', 'project.group', 'http...', 'json', 'HOK' ,0 ,'Standard Group', 1, '20220403' , 'Project App' ,'some hash' ,'project.group.v01', '{"GroupName" : "External Structure", "UniqueID" : "003"}')


        # create componnet
        create_component(conn, component1)
        create_component(conn, component2)
        create_component(conn, component3)
        create_component(conn, component4)
        create_component(conn, component5)


if __name__ == '__main__':
    main()