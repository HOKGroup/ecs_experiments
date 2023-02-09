import { useCallback, useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import EntityOrComponentTypeSelector from './components/EntityOrComponentTypeSelector';
import './App.css'
import SourceDataTable from './components/SourceDataTable';
import DestinationDataTable from './components/DestinationDataTable';

export type EntityOrComponentType = {
  type: "entity" | "component";
  value: string;
}

type EntityValue = {
  type: "entity";
  entity_guid: string;
}

type ComponentValue = {
  type: "component";
  component_guid: string;
}

export type EntityOrComponentValue = EntityValue | ComponentValue;

function App() {
  useEffect(() => {
    if (window.location.pathname === "/") {
      window.location.replace("/app");
    }
  }, []);

  const [sourceType, setSourceType] = useState(
    undefined as EntityOrComponentType | undefined
  );
  const [destinationType1, setDestinationType1] = useState(
    undefined as EntityOrComponentType | undefined
  );
  const [destinationType2, setDestinationType2] = useState(
    undefined as EntityOrComponentType | undefined
  );

  const [sourceValue, setSourceValue] = useState(
    undefined as EntityOrComponentValue | undefined
  );

  return (
    <div className="p-5 d-flex flex-column justify-content-between">
      <Row style={{ minHeight: "400px", maxHeight: "800px" }}>
        <Col lg="4" className="overflow-auto border border-2 rounded border-primary p-4 d-flex flex-column justify-content-between">
          <SourceDataTable onClick={setSourceValue} />
          <EntityOrComponentTypeSelector
            entityTypes={["Person"]}
            componentTypes={["Person.Details"]}
            onSelect={setSourceType}
          />
        </Col>
        <Col
          lg="4"
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <div className="d-flex border border-2 rounded border-primary m-4 w-75 h-50 justify-content-center align-items-center">
            <div>
              <p>{"Greg.schleusner@hok.com >>"}</p>
              <p>{"Radish Horse The” / Owner​"}</p>
            </div>
          </div>
          <div>RELATIONSHIP TYPE SELECTOR</div>
        </Col>
        <Col lg="4" className="overflow-auto border border-2 rounded border-primary p-4 d-flex flex-column justify-content-between">
          <DestinationDataTable />
          <Row>
            <Col lg="6">
              <EntityOrComponentTypeSelector
                entityTypes={["Person"]}
                componentTypes={["Person.Details"]}
                onSelect={setSourceType}
              />
            </Col>
            <Col lg="6">
              <EntityOrComponentTypeSelector
                entityTypes={["Person"]}
                componentTypes={["Person.Details"]}
                onSelect={setSourceType}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="p-5">
        <Col lg="5" md="4" sm="3" />
        <Col lg="1" md="2" sm="3" className="text-center d-flex justify-content-around">
          <Button variant="outline-secondary">Cancel</Button>
        </Col>
        <Col lg="1" md="2" sm="3" className="text-center d-flex justify-content-around">
          <Button variant="outline-primary">Submit</Button>
        </Col>
        <Col lg="5" md="4" sm="3" />
      </Row>
    </div>
  );

  return (
    <Container
      id="main-container"
      fluid
      className="d-flex flex-column justify-content-between"
    >
      <Row style={{ height: "85%" }}>
        <Col
          lg="5"
          className="px-4 py-2 d-flex flex-column justify-content-between"
        >
          <Row className="w-100 h-100">
            <Col
              lg="12"
              style={{ height: "90%" }}
              className="p-0 border border-primary rounded overflow-auto"
            >
              <SourceDataTable onClick={setSourceValue} />
            </Col>
            <Col lg="12" className="p-0" style={{ height: "10%" }}>
              <EntityOrComponentTypeSelector
                entityTypes={["Person"]}
                componentTypes={["Person.Details"]}
                onSelect={setSourceType}
              />
            </Col>
          </Row>
        </Col>
        <Col lg="2" className="d-flex flex-column justify-content-center">
          <div className="border border-primary">RELATIONSHIP</div>
          <div>SELECTOR</div>
        </Col>
        <Col
          lg="5"
          className="px-4 py-2 d-flex flex-column justify-content-between"
        >
          <Row className="w-100 h-100">
            <Col
              lg="12"
              style={{ height: "90%" }}
              className="p-0 border border-primary rounded overflow-auto"
            >
              <DestinationDataTable />
            </Col>
            <Row className="m-0 p-0" style={{ height: "10%" }}>
              <Col lg="6">
                <EntityOrComponentTypeSelector
                  entityTypes={["Person"]}
                  componentTypes={["Person.Details"]}
                  onSelect={setSourceType}
                />
              </Col>
              <Col lg="6">
                <EntityOrComponentTypeSelector
                  entityTypes={["Person"]}
                  componentTypes={["Person.Details"]}
                  onSelect={setSourceType}
                />
              </Col>
            </Row>
          </Row>
        </Col>
      </Row>
      <Row style={{ height: "10%" }}>
        <Col lg="5" />
        <Col lg="2">
          <div className="h-100 d-flex justify-content-around align-items-center">
            <Button variant="outline-secondary">Cancel</Button>
            <Button variant="outline-primary">Submit</Button>
          </div>
        </Col>
        <Col lg="2" />
      </Row>
    </Container>
  );
}

export default App;
