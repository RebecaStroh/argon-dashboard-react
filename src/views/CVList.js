import React, { useState } from 'react';
// reactstrap components
import {
  Container,
  Row,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import CVItem from "components/CVItem";

const CVList = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [viewType, setViewType] = useState("");

  function handleViewTypeChange(value) {
    // if ((value == "scoreTableView" || value == "scoreGraphicView") && Object.keys(areaData).length === 0) {
    //   alert(`Para visualizar a pontuação Qualis, é necessário selecionar uma Área do Conhecimento.`)
    //   return;
    // }
    setViewType(value);
  }
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex">
            <FormGroup className="w-100 mb-1">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" />
              </InputGroup>
            </FormGroup>
          </Form>
        </Container>
      </Navbar>
      <div className="header bg-gray pb-8 pt-5 pt-md-8">
      </div>
      {/* Page content */}
      <Container className="mt--9" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Currículos Carregados</h3>
              </CardHeader>
              <CardBody>
                <Row className="icon-examples">
                  <CVItem authorName="Stephen Rehen" CVLink="https://react-icons.github.io/react-icons"/>
                  <CVItem authorName="Stephen Rehen" CVLink="https://react-icons.github.io/react-icons"/>
                  <CVItem authorName="Stephen Rehen" CVLink="https://react-icons.github.io/react-icons"/>
                  <CVItem authorName="Stephen Rehen" CVLink="https://react-icons.github.io/react-icons"/>
                  <CVItem authorName="Stephen Rehen" CVLink="https://react-icons.github.io/react-icons"/>
                  <CVItem authorName="Stephen Rehen" CVLink="https://react-icons.github.io/react-icons"/>
                </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default CVList;
