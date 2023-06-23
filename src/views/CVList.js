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
import CVItem from "components/CVItem";

const CVList = ({
  authors
}) => {  
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex">
            <FormGroup className="w-100 mb-1">
              <InputGroup className="input-group-alternative" style={{ marginRight: "15px", border: 'none', backgroundColor: 'white' }}>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" style={{ color: "#415e98" }}/>
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" style={{ color: "#415e98" }}/>
              </InputGroup>
            </FormGroup>
          </Form>
        </Container>
      </Navbar>
      <div className="header pb-8 pt-5 pt-md-8">
      </div>
      {/* Page content */}
      <Container className="mt--9" fluid>
        <Row>
          <div className="col">
            <Card className="shadow mt-3">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Currículos Carregados</h3>
              </CardHeader>
              <CardBody>
                <Row className="icon-examples">
                  {Object.entries(authors).map(author => <CVItem authorName={author[1].name} CVLink={author[0]} key={author[0]}/>)}
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
