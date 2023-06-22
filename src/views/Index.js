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
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
// core components

import DataTable from "components/Data/DataTable";
import DataGraph from "components/Data/DataGraph";
import { addMissingYearsToAuthorStats, getQualisStats } from '../utils';


const Index = ({
  authors,
  groups,
  authorsNameLink,
  allQualisScores
}) => {
  const [area, setArea] = useState("oi");
  const [viewType, setViewType] = useState("");
  const [showStatistics, setShowStatistics] = useState(false);

  const [initYear, setInitYear] = useState(0);
  const [endYear, setEndYear] = useState(0);
  const [initYearInput, setInitYearInput] = useState(0);
  const [endYearInput, setEndYearInput] = useState(0);

  const [stats, setStats] = useState([]);


  const cvOptions = authorsNameLink.concat(Object.values(groups));

  // TODO
  function handleViewTypeChange(value) {
    // if ((value == "scoreTableView" || value == "scoreGraphicView") && Object.keys(areaData).length === 0) {
    //   alert(`Para visualizar a pontuação Qualis, é necessário selecionar uma Área do Conhecimento.`)
    //   return;
    // }
    setViewType(value);
  }

  // TODO
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
              <InputGroup className="input-group-alternative" style={{width:"500px"}}>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-user" />
                  </InputGroupText>
                </InputGroupAddon>
                <Autocomplete
                  onChange={(event, values) => {
                    // get authors links
                    values = values.map(value => value.link ? value.link : value.authors)
                      .flat().filter((value, index, self) => self.indexOf(value) === index);

                    if (values.length === 0) return;

                    // get all cvs
                    const cvs = values.map(link => authors[link]);
                    const pubInfos = cvs.map(cv => cv.pubInfo).flat();

                    // merge pubInfos
                    const mergedPubInfos = {};

                    for (const pubInfo of pubInfos) {
                      for (const year in pubInfo) {
                        if (mergedPubInfos[year]) {
                          mergedPubInfos[year] = mergedPubInfos[year].concat(pubInfo[year]);
                        } else {
                          mergedPubInfos[year] = pubInfo[year];
                        }
                      }
                    }

                    // GET YEARS
                    const years = Object.keys(mergedPubInfos);
                    const scores = {
                      "A1": 100,
                      "A2": 85,
                      "A3": 70,
                      "A4": 55,
                      "B1": 40,
                      "B2": 30,
                      "B3": 20,
                      "B4": 10,
                      "C": 0
                    }

                    // GET STATS
                    let authorStats = {
                      stats: [],
                      minYear: years[0],
                      maxYear: years[years.length-1],
                      totalPubs: NaN,
                      pubInfo: [],
                    };
                    // add missing years (if any) to author stats
                    authorStats = addMissingYearsToAuthorStats(
                      getQualisStats(mergedPubInfos, 'qualis', scores),
                      mergedPubInfos
                    );

                    // get total journal publications
                    var totalPubs = 0;
                    for (const key of Object.keys(authorStats.stats)) {
                      if (key !== 'year' && key !== 'jcr') {
                        totalPubs += authorStats.stats[key].reduce(
                          (partialSum, a) => partialSum + a,
                          0
                        );
                      }
                    }
                    authorStats.totalPubs = totalPubs;

                    // console.log("ANOS: ", years[0], years[years.length-1])
                    // console.log("authorStats: ", authorStats)
                    // console.log("mergedPubInfos: ", mergedPubInfos)

                    setStats(authorStats.stats);
                    setInitYearInput(years[0]);
                    setEndYearInput(years[years.length-1]);
                    setInitYear(years[0]);
                    setEndYear(years[years.length-1]);
                  }}
                  multiple
                  options={cvOptions}
                  getOptionLabel={(option) => option.name}
                  defaultValue={[]}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Selecione um CV"
                    />
                  )}
                  sx={{
                    width: '90%',
                    '& fieldset': {
                      border: "none",
                    },
                  }}
                />
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
                  {allQualisScores.map(greatArea => <optgroup label={greatArea.label}  style={{color: "black"}}>
                    {Object.keys(greatArea.areas).map(area => <option key={area} value={area}>{greatArea.areas[area].label}</option>)}
                  </optgroup>)}
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
      <Container className="mt--5" fluid>
        {viewType === "qualisTableView" && <DataTable tableName="Tabela de classificação Qualis" init={initYearInput} end={endYearInput} stats={stats} showStatistics={showStatistics}/>}
        {viewType === "qualisGraphicView" && <DataGraph graphName="Gráfico de classificação Qualis"/>}
        {viewType === "scoreTableView" && <DataTable tableName="Tabela de pontuação Qualis" init={initYearInput} end={endYearInput} stats={stats} showStatistics={showStatistics}/>}
        {viewType === "scoreGraphicView" && <DataGraph graphName="Gráfico de pontuação Qualis"/>}
        {viewType === "top5View" && <DataTable tableName="5 melhores publicações" init={initYearInput} end={endYearInput} stats={stats} showStatistics={showStatistics}/>}
        {viewType === "top10View" && <DataTable tableName="10 melhores publicações" init={initYearInput} end={endYearInput} stats={stats} showStatistics={showStatistics}/>}
      </Container>
    </>
  );
};

export default Index;
