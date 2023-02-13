# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     HokEcs.Repo.insert!(%HokEcs.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

defmodule HokEcs.DatabaseSeeder do
  alias HokEcs.Components.{Component, ComponentSchema}
  alias HokEcs.Entities.Entity
  # alias HokEcs.Relationships.Relationship

  alias HokEcs.Repo

  @schema_guids %{
    person_details: Ecto.UUID.generate(),
    project_details: Ecto.UUID.generate(),
    service_details: Ecto.UUID.generate(),
    service_admin: Ecto.UUID.generate(),
    submittal_author_details: Ecto.UUID.generate(),
    submittal_response: Ecto.UUID.generate()
  }

  def create_component_schemas() do
    create_person_details_schema()
    create_project_details_schema()
    create_service_details_schema()
    create_service_admin_schema()
    create_submittal_author_details_schema()
    create_submittal_response_schema()
  end

  def create_submittal_response_schema do
    %ComponentSchema{
      component_schema_guid: @schema_guids.submittal_response,
      name: "submittal.response",
      schema: %{
        "$schema" => "http://json-schema.org/schema#",
        "title" => "submittal.response",
        "version" => "V0.01",
        "type" => "object",
        "properties" => %{
          "GeneralAction" => %{
            "type" => "string",
            "description" => "Use Provided Name of the Submittal"
          },
          "Description" => %{
            "type" => "string",
            "description" => "User Provided Number of the submittal"
          },
          "ItemAction" => %{
            "type" => "array",
            "items" => %{
              "type" => "string",
              "description" => "List of potential documents or images attached to the submittal"
            }
          },
          "ContentArray" => %{
            "type" => "array",
            "items" => %{
              "type" => "string",
              "description" => "List of potential documents or images attached to the submittal"
            }
          }
        }
      }
    }
    |> Repo.insert!()
  end

  def create_submittal_author_details_schema do
    %ComponentSchema{
      component_schema_guid: @schema_guids.submittal_author_details,
      name: "submittal.author.details",
      schema: %{
        "$schema" => "http://json-schema.org/schema#",
        "title" => "submittal.author.details",
        "version" => "v0.01",
        "type" => "object",
        "properties" => %{
          "SubmittalName" => %{
            "type" => "string",
            "description" => "User Provided Name of the Submittal"
          },
          "SubmittalNumber" => %{
            "type" => "string",
            "description" => "User Provided Number of the Submittal"
          },
          "SubmittalDate" => %{
            "type" => "string",
            "description" => "Date the submittal was created"
          },
          "SubmittalDescription" => %{
            "type" => "string",
            "description" => "User Provided Description of the Submittal"
          },
          "SubmittalContents" => %{
            "type" => "array",
            "items" => %{
              "type" => "string",
              "description" => "List of potential documents or images attached to the submittal"
            }
          }
        }
      }
    }
    |> Repo.insert!()
  end

  def create_service_admin_schema() do
    %ComponentSchema{
      component_schema_guid: @schema_guids.service_admin,
      name: "service.admin",
      schema: %{
        "$schema" => "http://json-schema.org/schema#",
        "title" => "Service.Admin",
        "version" => "V0.01",
        "type" => "object",
        "properties" => %{
          "ServiceName" => %{
            "type" => "string",
            "description" => "The Project Name"
          },
          "ServiceAllias" => %{
            "type" => "string",
            "description" => "Location of the Project from a managmeent perspective "
          },
          "ServiceURL" => %{
            "type" => "Number",
            "description" => "The Project Number"
          },
          "ServiceType" => %{
            "description" => "Entity Specific Identifer",
            "type" => "string"
          },
          "ServiceOpenAPI_URL" => %{
            "type" => "string",
            "description" => "Location of the Project from a managmeent perspective "
          }
        }
      }
    }
    |> Repo.insert!()
  end

  def create_service_details_schema() do
    %ComponentSchema{
      component_schema_guid: @schema_guids.service_details,
      name: "service.details",
      schema: %{
        "$schema" => "http://json-schema.org/schema#",
        "title" => "Service.Details",
        "version" => "V0.01",
        "required" => ["ServiceName", "ServiceType"],
        "type" => "object",
        "properties" => %{
          "ServiceName" => %{
            "type" => "string",
            "description" => "The Project Name"
          },
          "ServiceAllias" => %{
            "type" => "string",
            "description" => "Location of the Project from a managmeent perspective "
          },
          "ServiceID" => %{
            "type" => "string",
            "description" => "Location of the Project from a managmeent perspective "
          },
          "ServiceURL" => %{
            "type" => "Number",
            "description" => "The Project Number"
          },
          "ProjecteURL" => %{
            "type" => "string",
            "description" => "URL to this service on the a Project"
          },
          "ServiceType" => %{
            "description" => "Entity Specific Identifer",
            "type" => "string"
          },
          "ServiceOpenAPI_URL" => %{
            "type" => "string",
            "description" => "Location of the Project from a managmeent perspective "
          }
        }
      }
    }
    |> Repo.insert!()
  end

  def create_person_details_schema() do
    %ComponentSchema{
      component_schema_guid: @schema_guids.person_details,
      name: "person.details",
      schema: %{
        "$schema" => "http://json-schema.org/schema#",
        "title" => "Person.Details",
        "version" => "V0.02",
        "type" => "object",
        "properties" => %{
          "FirstName" => %{
            "type" => "string",
            "description" => "Persons First Name"
          },
          "LastName" => %{
            "type" => "string",
            "description" => "Persons last Name"
          },
          "EmailAddress" => %{
            "type" => "string",
            "description" => "persons email address"
          },
          "UniqueID" => %{
            "description" => "Entity Specific Identifer",
            "type" => "string"
          }
        }
      }
    }
    |> Repo.insert!()
  end

  def create_project_details_schema() do
    %ComponentSchema{
      component_schema_guid: @schema_guids.project_details,
      name: "project.details",
      schema: %{
        "$schema" => "http://json-schema.org/schema#",
        "title" => "Project.Details",
        "version" => "V0.01",
        "type" => "object",
        "properties" => %{
          "ProjectName" => %{
            "type" => "string",
            "description" => "The Project Name"
          },
          "ProjectNameAlias" => %{
            "type" => "string",
            "description" => "Location of the Project from a managmeent perspective "
          },
          "ProjectNumber" => %{
            "type" => "Number",
            "description" => "The Project Number"
          },
          "UniqueID" => %{
            "description" => "Entity Specific Identifer",
            "type" => "string"
          },
          "AdminLocation" => %{
            "type" => "string",
            "description" => "Location of the Project from a management perspective "
          }
        }
      }
    }
    |> Repo.insert!()
  end

  def create_specification_entity() do
    _entity =
      %Entity{
        classification: "Specification",
        classification_reference: "http...",
        context: "hok-specification-active",
        creation_date: "22.00001.00"
      }
      |> Repo.insert!()
  end

  def create_person_entity() do
    entity =
      %Entity{
        classification: "Person",
        classification_reference: "http...",
        context: "hok-staff-active",
        creation_date: "20220403"
      }
      |> Repo.insert!()

    _per_com1 =
      %Component{
        context: "hok-staff-active",
        component_name: "$random string goes here$",
        component_id: "1",
        entity_guid: entity.entity_guid,
        entity_classification: "Person",
        component_type: "person.details",
        component_type_reference: "http...",
        component_payload_type: "json",
        owner: "HOK",
        version: 0,
        status: "looking good",
        active: true,
        creation_date: "20220403",
        authoring_application: "HOK People APP",
        hash1: "jdjdjdjdjdjd",
        schema: "person.details.v01",
        payload: %{
          "FirstName" => "Greg",
          "LastName" => "Schleusner",
          "EmailAddress" => "greg.schleusner@firm.com",
          "UniqueID" => "10101010101010"
        }
      }
      |> Repo.insert!()
  end

  def create_service_entity() do
    entity =
      %Entity{
        classification: "Service",
        classification_reference: "http...",
        context: "hok-services-active",
        creation_date: "20220413"
      }
      |> Repo.insert!()

    _serv_com1 =
      %Component{
        context: "hok-services-active",
        component_name: "$Service Name goes here$",
        component_id: "Serviceid",
        entity_guid: entity.entity_guid,
        entity_classification: "Service",
        component_type: "service.details",
        component_type_reference: "http...",
        component_payload_type: "json",
        owner: "HOK",
        version: 0,
        status: "running",
        active: true,
        creation_date: "20220403",
        authoring_application: "Service Manager",
        hash1: "some hash",
        schema: "service.details.v01",
        payload: %{
          "ServiceName" => "TrimbleConnectSight",
          "ServiceAcronym" => "TCS",
          "BaseURL" => "http://trimbleconnectsight.com",
          "UniqueID" => "1231123",
          "SupportContact" => "person@trimble.com"
        }
      }
      |> Repo.insert!()

    _serv_com2 =
      %Component{
        context: "hok-services-active",
        component_name: "$Service Name goes here$",
        component_id: "ProjectServiceID",
        entity_guid: entity.entity_guid,
        entity_classification: "Service",
        component_type: "service.details.project.project",
        component_type_reference: "http...",
        component_payload_type: "json",
        owner: "HOK",
        version: 0,
        status: "running",
        active: true,
        creation_date: "20220403",
        authoring_application: "Service Manager",
        hash1: "some hash",
        schema: "service.details.project.v01",
        payload: %{
          "ServiceName" => "TrimbleConnectSight",
          "ServiceAcronym" => "TCS",
          "ServiceURL" => "http://trimbleconnectsight.com/myproject...",
          "ProjectGUID" => "1231123",
          "SupportContact" => "person@trimble.com"
        }
      }
      |> Repo.insert!()

    _serv_com3 =
      %Component{
        context: "hok-services-active",
        component_name: "$Service Name goes here$",
        component_id: "ProjectServiceID",
        entity_guid: entity.entity_guid,
        entity_classification: "Service",
        component_type: "service.details.project",
        component_type_reference: "http...",
        component_payload_type: "json",
        owner: "HOK",
        version: 0,
        status: "running",
        active: true,
        creation_date: "20220403",
        authoring_application: "Service Manager",
        hash1: "some hash",
        schema: "service.details.v01",
        payload: %{
          "ServiceName" => "TrimbleConnectSight",
          "ServiceAcronym" => "TCS",
          "BaseURL" => "http://trimbleconnectsight.com",
          "UniqueID" => "1231123",
          "SupportContact" => "person@trimble.com"
        }
      }
      |> Repo.insert!()

    _serv_com4 =
      %Component{
        context: "hok-services-active",
        component_name: "$Service Name goes here$",
        component_id: "ProjectServiceID",
        entity_guid: entity.entity_guid,
        entity_classification: "Service",
        component_type: "service.details.project",
        component_type_reference: "http...",
        component_payload_type: "json",
        owner: "HOK",
        version: 0,
        status: "running",
        active: true,
        creation_date: "20220403",
        authoring_application: "Service Manager",
        hash1: "some hash",
        schema: "service.details.v01",
        payload: %{
          "ServiceName" => "TrimbleConnectSight",
          "ServiceAcronym" => "TCS",
          "BaseURL" => "http://trimbleconnectsight.com",
          "UniqueID" => "1231123",
          "SupportContact" => "person@trimble.com"
        }
      }
      |> Repo.insert!()

    _serv_com5 =
      %Component{
        context: "hok-services-active",
        component_name: "HOK Regular Staff",
        component_id: "001",
        entity_guid: entity.entity_guid,
        entity_classification: "Service",
        component_type: "project.group",
        component_type_reference: "http...",
        component_payload_type: "json",
        owner: "HOK",
        version: 0,
        status: "Standard Group",
        active: true,
        creation_date: "20220403",
        authoring_application: "Project App",
        hash1: "some hash",
        schema: "project.group.v01",
        payload: %{
          "GroupName" => "HOK Regular Staff",
          "UniqueID" => "001"
        }
      }
      |> Repo.insert!()

    _serv_com6 =
      %Component{
        context: "hok-services-active",
        component_name: "HOK Admins",
        component_id: "002",
        entity_guid: entity.entity_guid,
        entity_classification: "Service",
        component_type: "project.group",
        component_type_reference: "http...",
        component_payload_type: "json",
        owner: "HOK",
        version: 0,
        status: "Standard Group",
        active: true,
        creation_date: "20220403",
        authoring_application: "Project App",
        hash1: "some hash",
        schema: "project.group.v01",
        payload: %{
          "GroupName" => "HOK Admins",
          "UniqueID" => "002"
        }
      }
      |> Repo.insert!()

    _serv_com7 =
      %Component{
        context: "hok-services-active",
        component_name: "External Structural Team",
        component_id: "003",
        entity_guid: entity.entity_guid,
        entity_classification: "Service",
        component_type: "project.group",
        component_type_reference: "http...",
        component_payload_type: "json",
        owner: "HOK",
        version: 0,
        status: "Standard Group",
        active: true,
        creation_date: "20220403",
        authoring_application: "Project App",
        hash1: "some hash",
        schema: "project.group.v01",
        payload: %{
          "GroupName" => "External Structure",
          "UniqueID" => "003"
        }
      }
      |> Repo.insert!()
  end

  def create_project_entity() do
    entity =
      %Entity{
        classification: "Project",
        classification_reference: "http...",
        context: "hok-project-active",
        creation_date: "20220403"
      }
      |> Repo.insert!()

    _proj_com1 =
      %Component{
        context: "hok-project-active",
        component_name: "$Project Name Goes Here$",
        component_id: "1231312.00",
        entity_guid: entity.entity_guid,
        entity_classification: "Project",
        component_type: "project.details",
        component_type_reference: "http...",
        component_payload_type: "json",
        owner: "HOK",
        version: 0,
        status: "on track",
        active: true,
        creation_date: "20220403",
        authoring_application: "Project App",
        hash1: "some hash",
        schema: "project.details.v01",
        payload: %{
          "ProjectName" => "My Project",
          "ProjectNameAlias" => "fox banana grass",
          "ProjectNumber" => "1231312.00",
          "UniqueID" => "2121212121",
          "AdminLocation" => "LA"
        }
      }
      |> Repo.insert!()

    _proj_com2 =
      %Component{
        context: "hok-project-active",
        component_name: "Legal Site Boundary",
        component_id: "1231312.00",
        entity_guid: entity.entity_guid,
        entity_classification: "Project",
        component_type: "project.location.polygon",
        component_type_reference: "http...",
        component_payload_type: "geojson",
        owner: "HOK",
        version: 0,
        status: "surveyed",
        active: true,
        creation_date: "20220403",
        authoring_application: "Mapping App",
        hash1: "some hash",
        schema: "project.location.polygon.v01",
        payload: %{
          "type" => "FeatureCollection",
          "features" => [
            %{
              "type" => "Feature",
              "properties" => %{},
              "geometry" => %{
                "coordinates" => [
                  [
                    [-119.69575654897366, 34.42077299472784],
                    [-119.69645693125482, 34.42011949900281],
                    [-119.69609819886695, 34.41988698716244],
                    [-119.69540849314501, 34.420524631724675],
                    [-119.69575654897366, 34.42077299472784]
                  ]
                ],
                "type" => "Polygon"
              }
            }
          ]
        }
      }
      |> Repo.insert!()

    _proj_com3 =
      %Component{
        context: "hok-project-active",
        component_name: "HOK Regular Staff",
        component_id: "001",
        entity_guid: entity.entity_guid,
        entity_classification: "Project",
        component_type: "project.group",
        component_type_reference: "http...",
        component_payload_type: "json",
        owner: "HOK",
        version: 0,
        status: "Standard Group",
        active: true,
        creation_date: "20220403",
        authoring_application: "Project App",
        hash1: "some hash",
        schema: "project.group.v01",
        payload: %{
          "GroupName" => "HOK Regular Staff",
          "UniqueID" => "001"
        }
      }
      |> Repo.insert!()

    _proj_com4 =
      %Component{
        context: "hok-project-active",
        component_name: "HOK Admins",
        component_id: "002",
        entity_guid: entity.entity_guid,
        entity_classification: "Project",
        component_type: "project.group",
        component_type_reference: "http...",
        component_payload_type: "json",
        owner: "HOK",
        version: 0,
        status: "Standard Group",
        active: true,
        creation_date: "20220403",
        authoring_application: "Project App",
        hash1: "some hash",
        schema: "project.group.v01",
        payload: %{
          "GroupName" => "Admins",
          "UniqueID" => "002"
        }
      }
      |> Repo.insert!()

    _proj_com5 =
      %Component{
        context: "hok-project-active",
        component_name: "External Structural Team",
        component_id: "003",
        entity_guid: entity.entity_guid,
        entity_classification: "Project",
        component_type: "project.group",
        component_type_reference: "http...",
        component_payload_type: "json",
        owner: "HOK",
        version: 0,
        status: "Standard Group",
        active: true,
        creation_date: "20220403",
        authoring_application: "Project App",
        hash1: "some hash",
        schema: "project.group.v01",
        payload: %{
          "GroupName" => "External Structure",
          "UniqueID" => "003"
        }
      }
      |> Repo.insert!()
  end

  def create_company_entity() do
    entity =
      %Entity{
        classification: "Company",
        classification_reference: "http...",
        context: "http:Some Company URL",
        creation_date: "20200405"
      }
      |> Repo.insert!()

    _comp_com1 =
      %Component{
        context: "http:Some Company URL",
        component_name: "$Company Name Goes Here$",
        entity_guid: entity.entity_guid,
        entity_classification: "Company",
        component_type: "company.details",
        component_type_reference: "http...",
        component_payload_type: "json",
        owner: "My Company Name",
        version: 0,
        status: "recently moved",
        active: true,
        creation_date: "20010403",
        authoring_application: "NA",
        hash1: "some hash",
        schema: "project.details.v01",
        payload: %{
          "CompanyName" => "My Company",
          "CompanyAcronym" => "MCN",
          "UniqueID" => "313131313131"
        }
      }
      |> Repo.insert!()

    _comp_com2 =
      %Component{
        context: "http:Some Company URL",
        component_name: "$Company Location Name Goes Here$",
        entity_guid: entity.entity_guid,
        entity_classification: "Company",
        component_type: "company.location.details",
        component_type_reference: "http...",
        component_payload_type: "json",
        owner: "Santa Barbara Location",
        version: 2,
        status: "Newly Updated",
        active: true,
        creation_date: "20210101",
        authoring_application: "NA",
        hash1: "some hash",
        schema: "project.location.v01",
        payload: %{
          "LocationName" => "Santa Barbara",
          "LocationAlias" => "North LA",
          "Address1" => "1234 Coast Street",
          "Address2" => "Suite1",
          "City" => "Santa Barbara",
          "State" => "CA",
          "PostalCode" => "97858",
          "UniqueID" => "4141414141",
          "AdminLocation" => "LA"
        }
      }
      |> Repo.insert!()

    _comp_com3 =
      %Component{
        context: "Some Company Address",
        component_name: "Address Point on Map",
        component_id: "1231312.00",
        entity_guid: entity.entity_guid,
        entity_classification: "Company",
        component_type: "project.location.point",
        component_type_reference: "http...",
        component_payload_type: "geojson",
        owner: "HOK",
        version: 0,
        status: "Surveyed",
        active: true,
        creation_date: "20220403",
        authoring_application: "Mapping App",
        hash1: "some hash",
        schema: "project.location.point.v01",
        payload: %{
          "type" => "FeatureCollection",
          "features" => [
            %{
              "type" => "Feature",
              "properties" => %{},
              "geometry" => %{
                "coordinates" => [
                  [
                    [-119.69575654897366, 34.42077299472784],
                    [-119.69645693125482, 34.42011949900281],
                    [-119.69609819886695, 34.41988698716244],
                    [-119.69540849314501, 34.420524631724675],
                    [-119.69575654897366, 34.42077299472784]
                  ]
                ],
                "type" => "Polygon"
              }
            },
            %{
              "type" => "Feature",
              "properties" => %{},
              "geometry" => %{
                "coordinates" => [-119.5951085481465, 34.43417862651167],
                "type" => "Point"
              }
            }
          ]
        }
      }
      |> Repo.insert!()
  end
end

alias HokEcs.DatabaseSeeder
alias HokEcs.Repo

Repo.transaction(fn ->
  DatabaseSeeder.create_component_schemas()
  DatabaseSeeder.create_company_entity()
  DatabaseSeeder.create_project_entity()
  DatabaseSeeder.create_service_entity()
  DatabaseSeeder.create_person_entity()
  DatabaseSeeder.create_specification_entity()
end)
