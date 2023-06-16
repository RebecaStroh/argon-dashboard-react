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
} from "reactstrap";

// core components

import DataTable from "components/Data/DataTable";
import DataGraph from "components/Data/DataGraph";

const Index = (props) => {
  const [area, setArea] = useState("oi");
  const [viewType, setViewType] = useState("");
  const [showStatistics, setShowStatistics] = useState(false);
  const [initYear, setInitYear] = useState(1993);
  const [endYear, setEndYear] = useState(2023);
  const [initYearInput, setInitYearInput] = useState(initYear);
  const [endYearInput, setEndYearInput] = useState(endYear);

  function handleViewTypeChange(value) {
    // if ((value == "scoreTableView" || value == "scoreGraphicView") && Object.keys(areaData).length === 0) {
    //   alert(`Para visualizar a pontuação Qualis, é necessário selecionar uma Área do Conhecimento.`)
    //   return;
    // }
    setViewType(value);
  }
  function handleAreaChange(event) {
    // get previous area (if any)
    // var prevArea = area;

    // get selected area
    const newArea = event.target.value;
    setArea(newArea);

    // if (newArea === 'undefined') {
    //   // save area data to local store
    //   chrome.storage.local.set({ area_data: {
    //     area: newArea,
    //     scores: {},
    //     label: 'Sem Área do Conhecimento',
    //     source: {},
    //     base_year: '',
    //   }});

    //   if (viewType == "scoreTableView" || viewType == "scoreGraphicView") {
    //     alert(`Para visualizar a pontuação Qualis, é necessário selecionar uma Área do Conhecimento.`)
    //     setViewType("");
    //   }
    // } else {
    //   // find selected area data in Qualis score data
    //   var match = allQualisScores.find((elem) =>
    //     Object.keys(elem.areas).includes(newArea)
    //   );

    //   if (match) {
    //     if (Object.keys(match.areas[newArea].scores).length > 0) {
    //       const currAreaData = {
    //         area: newArea,
    //         ...match.areas[newArea]
    //       }
    //       setAreaData(currAreaData);
    //       setArea(newArea);

    //       // save area data to local store
    //       chrome.storage.local.set({ area_data: currAreaData});
    //     } else {
    //       // show no scores alert and reset area select to previous area (if any)
    //       alert('Esta Área do Conhecimento não definiu pontuação específica para os estratos do Qualis.');
    //       if (prevArea !== '') {
    //         // reset area select to previously selected option
    //         event.target.value = prevArea;
    //       } else {
    //         // reset area select to placeholder option
    //         event.target.selectedIndex = 0;
    //       }
    //     }
    //   }
    // }
  }
  
  function handleSelectedPeriod(value) {
    setEndYearInput(endYear);
    switch (value) {
      case "last5":
        setInitYearInput(endYear-4);
        break;
      case "last10":
        setInitYearInput(endYear-9);
        break;
      default:
        setInitYearInput(initYear);
        break;
    }
  }

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            {/* Select authors / groups */}
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
              {/* área do conhecimento */}
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
                  value={area} onChange={e => handleAreaChange(e)}
                  defaultValue=""
                >
                  <option value="" disabled={true} hidden={true}>Selecione uma Área do Conhecimento</option>
                  <option value="undefined">Sem Área do Conhecimento</option>
                  {/* {allQualisScores.map(greatArea => <optgroup label={greatArea.label}>
                    {Object.keys(greatArea.areas).map(area => <option value={area}>{greatArea.areas[area].label}</option>)}
                    </optgroup>)} */}
                </Input>
              </InputGroup>
              {/* View type */}
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
                  defaultValue=""
                >
                  <option value="" disabled={true} hidden={true}> Selecione uma visualização</option>
                  <optgroup label="Classificação" style={{color: "black"}}>
                    <option value="qualisTableView">Tabela de classificação Qualis</option>
                    <option value="qualisGraphicView">Gráfico de classificação Qualis</option>
                  </optgroup>
                  <optgroup label="Pontuação" style={{color: "black"}}>
                    <option value="scoreTableView">Tabela de pontuação Qualis</option>
                    <option value="scoreGraphicView">Gráfico de pontuação Qualis</option>
                  </optgroup>
                  <optgroup label="Publicações" style={{color: "black"}}>
                    <option value="top5View">5 melhores artigos</option>
                    <option value="top10View">10 melhores artigos</option>
                  </optgroup>
                </Input>
              </InputGroup>
            </FormGroup>
            <FormGroup className="w-100">
              {/* Init year */}
              <InputGroup className="input-group-alternative" style={{width:"100px"}}>
                <Input
                  id="exampleEmail"
                  name="initYear"
                  placeholder="Ano de inicio"
                  type="number"
                  min={initYear} max={endYearInput}
                  value={initYearInput}
                  required="required"
                  onChange={e => setInitYearInput(e.target.value)}
                />
              </InputGroup>
              <Label style={{marginLeft: "10px", marginRight: "10px", color: 'white'}}>
                a
              </Label>
              {/* End year */}
              <InputGroup className="input-group-alternative" style={{width:"100px"}}>
                <Input
                  id="exampleEmail"
                  name="endYear"
                  placeholder="Ano de fim"
                  type="number"
                  min={initYearInput} max={endYear}
                  value={endYearInput}
                  required="required"
                  onChange={e => setEndYearInput(e.target.value)}
                />
              </InputGroup>
              {/* Period */}
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
                  onChange={e => handleSelectedPeriod(e.target.value)}
                  defaultValue="all"
                >
                  <option value="last5" style={{color: "black"}}>Últimos 5 anos</option>
                  <option value="last10" style={{color: "black"}}>Últimos 10 anos</option>
                  <option value="all" style={{color: "black"}}> Todo o período do CV</option>
                </Input>
              </InputGroup>
              {/* Statistics */}
              <InputGroupText style={{backgroundColor: "transparent", border: "none"}}>
                <Input
                  addon
                  aria-label="Checkbox for following text input"
                  type="checkbox"
                  value={showStatistics}
                  onChange={(e) =>setShowStatistics(!showStatistics)}
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
      <div className="header bg-gray pb-8 pt-5 pt-md-8">
      </div>
      {/* Page content */}
      <Container className="mt--6" fluid>
        {viewType === "qualisTableView" && <DataTable tableName="Tabela de classificação Qualis" init={initYearInput} end={endYearInput} stats={"stats"} showStatistics={showStatistics}/>}
        {viewType === "qualisGraphicView" && <DataGraph graphName="Gráfico de classificação Qualis"/>}
        {viewType === "scoreTableView" && <DataTable tableName="Tabela de pontuação Qualis" init={initYearInput} end={endYearInput} stats={"stats"} showStatistics={showStatistics}/>}
        {viewType === "scoreGraphicView" && <DataGraph graphName="Gráfico de pontuação Qualis"/>}
        {viewType === "top5View" && <DataTable tableName="5 melhores publicações" init={initYearInput} end={endYearInput} stats={"stats"} showStatistics={showStatistics}/>}
        {viewType === "top10View" && <DataTable tableName="10 melhores publicações" init={initYearInput} end={endYearInput} stats={"stats"} showStatistics={showStatistics}/>}
      </Container>
    </>
  );
};

export default Index;
