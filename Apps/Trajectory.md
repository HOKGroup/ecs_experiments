# Trajectory Modeling
https://mermaid.js.org/syntax/gantt.html
```mermaid
journey
    title Add Someone to Project Current SmartSheet
    section SmartSheet Method User
      Go To Project in SH: 5: User
      Enter user Details: 3: User
      Check Box for Service: 3: User
      Wait for Resolution: 1: User
    section SmartSheet Method Admin
      Admin Gets Email: 3: Admin
      Admin Enters in Trajecory: 5: Admin
      Admin Emails/Messages user: 3: Admin
```
```mermaid
journey
    title Add Someone to Project Current Without Smartsheet
    section Communicate Requirements
      User Enter Help Desk Ticket or Messages DTM: 1: User
      Helpdesk assigned to DTM: 3: Admin
      DTM Clarifies User Details: 3: Admin
    section SmartSheet Method Admin
      Admin Gets Email: 3: Admin
      Admin Enters in Trajecory: 5: Admin
      Admin Emails/Messages user: 3: Admin
```
```mermaid
journey
    title Trajectory Next Worklfow
    section Add User to Project
      User goes to Web App: 7: User
      User Enter User Details: 7: User
      User Picks the Company, User Type: 6: User
      User Is Emailed when the Team Member is added: 7: User
```
```mermaid
---
title: Trajectory App Scope
---
erDiagram
    Person_Entity ||..|{ Person_Component_Details : Parents
    Project_Entity ||..|{ Project_Component_Details:Parents
    Project_Entity ||..|{ Project_Component_Group1:Parents
    Project_Entity ||..|{ Project_Component_Group2:Parents
    Service_Entity ||..|{ Service_Component_Details:Parents
    Service_Entity ||..|{ Service_Component_Role1:Parents
    Service_Entity ||..|{ Service_Component_Role2:Parents
    Project_Component_Group1 }|..|| Relationship_MemberOf1 : Links
    Person_Component_Details }|..|| Relationship_MemberOf1 : Links
    
    Relationship_MemberOf1 {
            FromEntities
            FromComponents
            ToEntities
            ToComponents
        }
        Relationship_MemberOf2 {
            FromEntities
            FromComponents
            ToEntities
            ToComponents
        }
    Service_Component_Role2 }|..|| Relationship_MemberOf2 :Links
    Person_Component_Details }|..|| Relationship_MemberOf2 :Links
```
```mermaid
---
title: Add User
---
flowchart TD
    A[Start] --> B{Project Exist?}
    B --->|Yes| K[Query Project Layer]
    K --> C[Add Person_Details Component+E]
    B -->|No| D[Add Project_Detials Component+E]
    D--> J[Create Project Layer]
    J --> E[Add Project Group1, Group2 Components]
    E --> C
    C --> F[ProjectGroup+PersonDetails MemberOf Relationship]
    F --> G[Add Service_Details Component+E]
    G --> H[Add Service Role1, Role2 Components]
    H --> I[Service Role + PersonDetails MemberOf Relationship]
    I --> L[Update Project Layer]
```