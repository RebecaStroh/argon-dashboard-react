/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { Link } from "react-router-dom";

import React, { useState } from 'react';
// reactstrap components
import {
  Button,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Label,
  Container,
  Media,
} from "reactstrap";

const AdminNavbar = (props) => {
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
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="w-100 mb-1">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-user" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" />
              </InputGroup>
            </FormGroup>
            <FormGroup className="w-100 mb-1">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-graduation-cap" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  id="exampleSelect"
                  name="select"
                  type="select"
                  className="input-group-alternative"
                  style={{marginRight: "15px"}}
                  value={viewType} onChange={e => handleViewTypeChange(e.target.value)}
                >
                  <option value="" disabled="true" selected="true" hidden="true">Selecione uma Área do Conhecimento</option>
                  <option value="undefined">Sem Área do Conhecimento</option>
                  {/* {allQualisScores.map(greatArea => <optgroup label={greatArea.label}>
                    {Object.keys(greatArea.areas).map(area => <option value={area}>{greatArea.areas[area].label}</option>)}
                    </optgroup>)} */}
                </Input>
              </InputGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-chart-bar" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  id="exampleSelect"
                  name="select"
                  type="select"
                  className="input-group-alternative"
                  style={{marginRight: "15px"}}
                  value={viewType} onChange={e => handleViewTypeChange(e.target.value)}
                >
                  <option value="" disabled="true" selected="true" hidden="true"> Selecione uma visualização</option>
                  <optgroup label="Classificação">
                    <option value="qualisTableView">Tabela de classificação Qualis</option>
                    <option value="qualisGraphicView">Gráfico de classificação Qualis</option>
                  </optgroup>
                  <optgroup label="Pontuação">
                    <option value="scoreTableView">Tabela de pontuação Qualis</option>
                    <option value="scoreGraphicView">Gráfico de pontuação Qualis</option>
                  </optgroup>
                  <optgroup label="Publicações">
                    <option value="top5View">5 melhores artigos</option>
                    <option value="top10View">10 melhores artigos</option>
                  </optgroup>
                </Input>
              </InputGroup>
            </FormGroup>
            <FormGroup className="w-100">
              <InputGroup className="input-group-alternative" style={{width:"100px"}}>
                <Input
                  id="exampleEmail"
                  name="initYear"
                  placeholder="Ano de inicio"
                  type="text"
                />
              </InputGroup>
              <Label style={{marginLeft: "10px", marginRight: "10px"}}>
                a
              </Label>
              <InputGroup className="input-group-alternative" style={{width:"100px"}}>
                <Input
                  id="exampleEmail"
                  name="endYear"
                  placeholder="Ano de fim"
                  type="text"
                />
              </InputGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-calendar-check" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  id="exampleSelect"
                  name="select"
                  type="select"
                  className="input-group-alternative"
                  style={{marginRight: "15px"}}
                  value={viewType} onChange={e => handleViewTypeChange(e.target.value)}
                >
                  <option value="undefined">Selecione um periodo</option>
                  <option value="last5">Últimos 5 anos</option>
                  <option value="last10">Últimos 10 anos</option>
                  <option value="all" selected="true"> Todo o período do CV</option>
                </Input>
              </InputGroup>
              <InputGroupText style={{backgroundColor: "transparent", border: "none"}}>
                <Input
                  addon
                  aria-label="Checkbox for following text input"
                  type="checkbox"
                />
                <Label style={{marginLeft: "10px"}}>
                  Exibir estatísticas
                </Label>
              </InputGroupText>
            </FormGroup>
          </Form>
          
          <div className="col text-right">
            <Button
              color="primary"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
              size="sm"
            >
              Exportar dados
            </Button>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
