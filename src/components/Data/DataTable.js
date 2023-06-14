
// reactstrap components
import {
  Card,
  CardHeader,
  Table,
  Row,
  Col,
} from "reactstrap";

// core components

const DataTable = ({
  tableName,
  init,
  end,
  stats,
  showStatistics
}) => {
  const qualisScores = {
    A1: 100,
    A2: 85,
    A3: 70,
    A4: 55,
    B1: 40,
    B2: 30,
    B3: 20,
    B4: 10,
    C: 0,
    N: 0,
  };

  // Init data arrays
  const years = Array.from({ length: end - init + 1 }, (_, index) => init + index).reverse();
  const qualis = {
    A1: Array(years.length).fill(0),
    A2: Array(years.length).fill(0),
    A3: Array(years.length).fill(0),
    A4: Array(years.length).fill(0),
    B1: Array(years.length).fill(0),
    B2: Array(years.length).fill(0),
    B3: Array(years.length).fill(0),
    B4: Array(years.length).fill(0),
    C: Array(years.length).fill(0),
    N: Array(years.length).fill(0),
  }
  const totals = {
    A: Array(years.length).fill(0),
    B: Array(years.length).fill(0),
    all: Array(years.length).fill(0)
  };
  const percentages = {
    A: Array(years.length).fill(0),
    B: Array(years.length).fill(0),
  };

  // Create header from data arrays
  const header = ["Ano"].concat(Object.keys(qualis))
    .concat(Object.keys(totals).map(item => item == "all" ? "Total" : "Tot " + item))
    .concat(Object.keys(percentages).map(item => "% " + item));

  // Create footer from data arrays
  const footer = ["Total"].concat(Object.keys(qualis).map(item => 0))
    .concat(Object.keys(totals).map(item => 0))
    .concat(Object.keys(percentages).map(item => 0));

  const mean = ["Média"].concat(Object.keys(qualis).map(item => ""))
    .concat(Object.keys(totals).map(item => 0))
    .concat(Object.keys(percentages).map(item => 0));
  const mediana = ["Mediana"].concat(Object.keys(qualis).map(item => ""))
    .concat(Object.keys(totals).map(item => 0))
    .concat(Object.keys(percentages).map(item => 0));
  const tendencia = ["Tendência"].concat(Object.keys(qualis).map(item => ""))
    .concat(Object.keys(totals).map(item => 0))
    .concat(Object.keys(percentages).map(item => 0));
  const bestYear = ["Melhor ano"].concat(Object.keys(qualis).map(item => ""))
    .concat(Object.keys(totals).map(item => 0))
    .concat(Object.keys(percentages).map(item => 0));

  return (
    <Row>
      <Col className="mb-5 mb-xl-0" xl="12">
        <Card className="shadow">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <div className="col">
                <h3 className="mb-0">{tableName}</h3>
              </div>
            </Row>
          </CardHeader>
          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr style={{
                  display: 'table',
                  width: '98.5%'
                }}>
                {header.map(item => <th scope="col">{item}</th>)}
              </tr>
            </thead>
            <tbody style={{ display: 'block', maxHeight: '40vh', overflowY: 'auto' }}>
              {years.map((year, index) => 
                <tr style={{
                  display: 'table',
                  width: '100%'
                }}>
                  <th scope="row">{year}</th>
                  {Object.values(qualis).map(item => <td>{item[index]}</td>)}
                  {Object.values(totals).map(item => <td>{item[index]}</td>)}
                  {Object.values(percentages).map(item => <td>{item[index]}</td>)}
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr style={{
                  display: 'table',
                  width: '98.5%'
                }}>
                {footer.map(item => <th scope="col">{item}</th>)}
              </tr>
              {showStatistics && (<>
                <tr style={{
                    display: 'table',
                    width: '98.5%'
                  }}>
                  {mean.map(item => <th scope="col">{item}</th>)}
                </tr>
                <tr style={{
                    display: 'table',
                    width: '98.5%'
                  }}>
                  {mediana.map(item => <th scope="col">{item}</th>)}
                </tr>
                <tr style={{
                    display: 'table',
                    width: '98.5%'
                  }}>
                  {tendencia.map(item => <th scope="col">{item}</th>)}
                </tr>
                <tr style={{
                    display: 'table',
                    width: '98.5%'
                  }}>
                  {bestYear.map(item => <th scope="col">{item}</th>)}
                </tr>
              </>)}
            </tfoot>
          </Table>
        </Card>
      </Col>
    </Row>
  );
};

export default DataTable;
