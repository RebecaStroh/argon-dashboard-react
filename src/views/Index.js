
// reactstrap components
import {
  Container,
} from "reactstrap";

// core components

import Header from "components/Headers/Header.js";
import DataTable from "components/Data/DataTable";
import DataGraph from "components/Data/DataGraph";

const Index = (props) => {

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--6" fluid>
        <DataTable tableName="Tabela de classificação Qualis"/>
        {/* <DataGraph graphName="Gráfico de classificação Qualis"/> */}
        <DataTable tableName="Tabela de pontuação Qualis"/>
        {/* <DataGraph graphName="Gráfico de pontuação Qualis"/> */}
      </Container>
    </>
  );
};

export default Index;
