import sqlite3
from sqlite3 import Error
import random
import string
import uuid

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
    sql = ''' INSERT INTO entity(entity_guid,classification,classification_reference,context,creation_date)
              VALUES(?,?,?,?,?) '''
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

    sql = ''' INSERT INTO component(component_guid,context,component_name,component_id,entity_guid,entity_classification,component_type,component_type_referenece,component_payload_type,owner,version,status,active,creation_date,authoring_application,hash1,schema,payload)
              VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) '''
    cur = conn.cursor()
    cur.execute(sql, component)
    conn.commit()
    return cur.lastrowid


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

    ent1_uuid = str(uuid.uuid4())
    ent2_uuid = str(uuid.uuid4())
    ent3_uuid = str(uuid.uuid4())
    ent4_uuid = str(uuid.uuid4())
    ent5_uuid = str(uuid.uuid4())
    comp1_uuid = str(uuid.uuid4())
    comp2_uuid = str(uuid.uuid4())
    comp3_uuid = str(uuid.uuid4())
    comp4_uuid = str(uuid.uuid4())
    comp5_uuid = str(uuid.uuid4())
    comp6_uuid = str(uuid.uuid4())
    comp7_uuid = str(uuid.uuid4())
    comp8_uuid = str(uuid.uuid4())
    comp9_uuid = str(uuid.uuid4())
    comp10_uuid = str(uuid.uuid4())
    comp11_uuid = str(uuid.uuid4())
    comp12_uuid = str(uuid.uuid4())
    comp13_uuid = str(uuid.uuid4())
    comp14_uuid = str(uuid.uuid4())
    comp15_uuid = str(uuid.uuid4())
    comp16_uuid = str(uuid.uuid4())

    # create a database connection
    conn = create_connection(database)
    with conn:
        # create a new company entity
        entity = (ent1_uuid, 'Company', 'http...', 'http:Some Company URL', '20200405');
        entity_guid = create_entity(conn, entity)

        # component - Company.Details
        comp_com1 = (comp1_uuid,'http:Some Company URL', "$Company Name Goes Here$","", ent1_uuid, 'Company', 'company.details', 'http...', 'json', 'My Company Name' ,0 ,'resently moved', 1, '20010403' , 'NA' ,'some hash' ,'project.details.v01', '{"CompanyName" : "My Company", "Company Acronym" : "MCN", "UniqueID" : "313131313131"}')
        
        # component - Company.Location.details
        comp_com2 = (comp2_uuid,'http:Some Company URL', "$Company Locaton Name Goes Here$","", ent1_uuid, 'Company', 'company.location.details', 'http...', 'json', 'Santa Barbara Location' ,2 ,'Newly Updated', 1, '20210101' , 'NA' ,'some hash' ,'project.location.v01', '{"LocationName" : "Santa Barbara", "LocationAllias" : "North LA", "Address1" : "1234 Coast Street", "Address2" : "Suite1", "City" : "Santa Barbara", "State" : "CA", "Postal Code" : "97858", "UniqueID" : "414141414141", "AdminLocation" : "LA"}')

        # component Company.Location.point
        comp_com3 = (comp3_uuid,'Some Company Address', "Address Point on Map","1231312.00", ent1_uuid, 'company', 'project.location.point', 'http...', 'geojson', 'HOK' ,0 ,'Surveyed', 1, '20220403' , 'Mapping App' ,'some hash' ,'project.location.point.v01', '{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"coordinates":[[[-119.69575654897366,34.42077299472784],[-119.69645693125482,34.42011949900281],[-119.69609819886695,34.41988698716244],[-119.69540849314501,34.420524631724675],[-119.69575654897366,34.42077299472784]]],"type":"Polygon"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[-119.5951085481465,34.43417862651167],"type":"Point"}}]}')
        
        # create a new project entity
        enitity = (ent2_uuid,'Project', 'http...', 'hok-project-active', '20220403');
        entity_guid = create_entity(conn, enitity)

        # component project.details
        proj_com1 = (comp4_uuid,'hok-project-active', "$Project Name Goes here$","1231312.00", ent2_uuid, 'Project', 'project.details', 'http...', 'json', 'HOK' ,0 ,'on track', 1, '20220403' , 'Project App' ,'some hash' ,'project.details.v01', '{"ProjectName" : "My Project", "ProjectNameAlias" : "fox bannana grass", "ProjectNumber": "1231312.00", "UniqueID" : "2121212121", "AdminLocation" : "LA"}')

        # component project.location.polygon
        proj_com2 = (comp5_uuid,'hok-project-active', "Legal Site Boundry","1231312.00", ent2_uuid, 'Project', 'project.location.polygon', 'http...', 'geojson', 'HOK' ,0 ,'Surveyed', 1, '20220403' , 'Mapping App' ,'some hash' ,'project.location.polygon.v01', '{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"coordinates":[[[-119.69575654897366,34.42077299472784],[-119.69645693125482,34.42011949900281],[-119.69609819886695,34.41988698716244],[-119.69540849314501,34.420524631724675],[-119.69575654897366,34.42077299472784]]],"type":"Polygon"}}]}')

        # component project.group1
        proj_com3 = (comp6_uuid,'hok-project-active', "HOK Regular Staff","001", ent2_uuid, 'Project', 'project.group', 'http...', 'json', 'HOK' ,0 ,'Standard Group', 1, '20220403' , 'Project App' ,'some hash' ,'project.group.v01', '{"GroupName" : "HOK Regular Staff", "UniqueID" : "001"}')

         # component project.group2
        proj_com4 = (comp7_uuid,'hok-project-active', "HOK Admins","002", ent2_uuid, 'Project', 'project.group', 'http...', 'json', 'HOK' ,0 ,'Standard Group', 1, '20220403' , 'Project App' ,'some hash' ,'project.group.v01', '{"GroupName" : "Admins", "UniqueID" : "002"}')

         # component project.group3
        proj_com5 = (comp8_uuid,'hok-project-active', "External Structual Team","003", ent2_uuid, 'Project', 'project.group', 'http...', 'json', 'HOK' ,0 ,'Standard Group', 1, '20220403' , 'Project App' ,'some hash' ,'project.group.v01', '{"GroupName" : "External Structure", "UniqueID" : "003"}')

        # create a new entity
        enitity = (ent3_uuid, 'Service', 'http...', 'hok-services-active', '20220413');
        entity_guid = create_entity(conn, enitity)

        # component service.details
        serv_com1 = (comp9_uuid,'hok-services-active', "$Service Name goes here$","Serviceid", ent3_uuid, 'Service', 'service.details', 'http...', 'json', 'HOK' ,0 ,'running', 1, '20220403' , 'Service Manager' ,'some hash' ,'service.details.v01', '{"ServiceName" : "TrimbleConnectSight", "ServiceAcronym" : "TCS", "BaseURL": "http://trimbleconnectsight.com", "UniqueID" : "1231123", "SupportContact" : "person@trimble.com"}')

        # component service.details.project
        serv_com2 = (comp10_uuid,'hok-services-active', "$Service Name goes here$","ProjectServiceID", ent3_uuid, 'Service', 'service.details.project.project', 'http...', 'json', 'HOK' ,0 ,'running', 1, '20220403' , 'Service Manager' ,'some hash' ,'service.details.project.v01', '{"ServiceName" : "TrimbleConnectSight", "ServiceAcronym" : "TCS", "ServiceURL": "http://trimbleconnectsight.com/myproject...", "ProjectGUID" : "1231123", "SupportContact" : "person@trimble.com"}')        

        # component service.admin.add_project
        serv_com3 = (comp11_uuid,'hok-services-active', "$Service Name goes here$","ProjectServiceID", ent3_uuid, 'Service', 'service.details.project', 'http...', 'json', 'HOK' ,0 ,'running', 1, '20220403' , 'Service Manager' ,'some hash' ,'service.details.v01', '{"ServiceName" : "TrimbleConnectSight", "ServiceAcronym" : "TCS", "BaseURL": "http://trimbleconnectsight.com", "UniqueID" : "1231123", "SupportContact" : "person@trimble.com"}')

        # component service.admin.add_user
        serv_com4 = (comp12_uuid,'hok-services-active', "$Service Name goes here$","ProjectServiceID", ent3_uuid, 'Service', 'service.details.project', 'http...', 'json', 'HOK' ,0 ,'running', 1, '20220403' , 'Service Manager' ,'some hash' ,'service.details.v01', '{"ServiceName" : "TrimbleConnectSight", "ServiceAcronym" : "TCS", "BaseURL": "http://trimbleconnectsight.com", "UniqueID" : "1231123", "SupportContact" : "person@trimble.com"}')  

        # component service.user.role1
        serv_com5 = (comp13_uuid,'hok-project-active', "HOK Regular Staff","001", ent3_uuid, 'Project', 'project.group', 'http...', 'json', 'HOK' ,0 ,'Standard Group', 1, '20220403' , 'Project App' ,'some hash' ,'project.group.v01', '{"GroupName" : "HOK Regular Staff", "UniqueID" : "001"}')

        # component service.user.role2
        serv_com6 = (comp14_uuid,'hok-project-active', "HOK Admins","002", ent3_uuid, 'Project', 'project.group', 'http...', 'json', 'HOK' ,0 ,'Standard Group', 1, '20220403' , 'Project App' ,'some hash' ,'project.group.v01', '{"GroupName" : "Admins", "UniqueID" : "002"}')

        # component service.user.role3
        serv_com7 = (comp15_uuid,'hok-project-active', "External Structual Team","003", ent3_uuid, 'Project', 'project.group', 'http...', 'json', 'HOK' ,0 ,'Standard Group', 1, '20220403' , 'Project App' ,'some hash' ,'project.group.v01', '{"GroupName" : "External Structure", "UniqueID" : "003"}')

        # create a new entity
        enitity = (ent4_uuid, 'Person', 'http...', 'hok-staff-active', '20220403');
        entity_guid = create_entity(conn, enitity)

        # component
        per_com1 = (comp16_uuid,'hok-staff-active', "$random string goes here$","1", ent4_uuid, 'Person', 'person.details', 'http...', 'json', 'HOK' ,0 ,'looking good', 1, '20220403' , 'HOK People APP' ,'jdjdjdjdjd' ,'person.details.v01', '{"FirstName" : "Greg", "LastName" : "Schleusner", "Email": "greg.schleusner@firm.com", "UniqueID" : "1010101010101010"}')

        # create a new entity
        enitity = (ent5_uuid,'Specification', 'http...', 'hok-specification-active', '22.00001.00');
        entity_guid = create_entity(conn, enitity)

        # component - need to add the component sequence values to the above
        #spec_com1 = ('hok-specification-active', 'PartID', "Part 1", 'Unit Masonry','042000', ent5_uuid, 'Specification', 'specification.part', 'http...', 'json', 'HOK' ,0 ,'looking good', 1, '20220403' , 'Spec APP' ,'jdjdjdjdjd' ,'specification.part.v01', '{"------" : "Greg", "LastName" : "Schleusner", "Email": "greg.schleusner@firm.com", "UniqueID" : "1010101010101010"}')


        # create  company componnet
        create_component(conn, comp_com1)
        create_component(conn, comp_com2)
        create_component(conn, comp_com3)
        create_component(conn, proj_com1)
        create_component(conn, proj_com2)
        create_component(conn, proj_com3)
        create_component(conn, proj_com4)
        create_component(conn, proj_com5)
        create_component(conn, serv_com1)
        create_component(conn, serv_com2)
        create_component(conn, serv_com3)
        create_component(conn, serv_com4)
        #create_component(conn, serv_com5)
        #create_component(conn, serv_com6)
        #create_component(conn, serv_com7)
        create_component(conn, per_com1)
        #create_component(conn, spec_com1)


        # create a new relationship
        relationship = ('hok-relationships','memberof1', 'memberof', 'http...', 'null', 'null', 'null', 'null', 1, 1, '20230101');
        relationshipguid = create_relationship(conn, relationship)

        # create a new relationship
        relationship = ('hok-relationships','uses1', 'uses', 'http...', 'null', 'null', 'null', 'null', 1, 1, '20230101');
        relationshipguid = create_relationship(conn, relationship)

if __name__ == '__main__':
    main()