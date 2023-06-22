
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
  showStatistics,
  score
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

  init = Number(init);
  end = Number(end);

  // Init data arrays
  const years = stats.year;
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
  const totalStats = {
    A1: 0,
    A2: 0,
    A3: 0,
    A4: 0,
    B1: 0,
    B2: 0,
    B3: 0,
    B4: 0,
    C: 0,
    N: 0,
    '#A': 0,
    '#B': 0,
    '#all': 0,
    '%A': 0,
    '%B': 0,
  }

  // Get row datas
  for (let currYear = 0; currYear < years.length; currYear++) {
    // se o ano do stats nao estiver no meio do intervalo, pula
    if (stats.year[currYear] < init && stats.year[currYear] > end) continue;
    
    // create cells with data cols
    for (const key of Object.keys(qualis)) {
      const keyChar = key.slice(0, 1);

      // value
      const currentValue = score ? qualisScores[key] : stats[key][currYear];

      // Qualis columns
      qualis[key][currYear] = currentValue;

      // Total columns
      totals.all[currYear] += currentValue;
      if (['A', 'B'].includes(keyChar)) {
        totals[keyChar][currYear] += currentValue;
        percentages[keyChar][currYear] += currentValue;
      }

      // Total row
      totalStats[key] += currentValue;
      totalStats['#all'] += currentValue;
      if (['A', 'B'].includes(keyChar)) {
        totalStats['#'+keyChar] += currentValue;
        totalStats['%'+keyChar] += currentValue;
      }
    }

    percentages.A[currYear] = totals.all[currYear]===0 ? 0 : (percentages.A[currYear]/totals.all[currYear]*100);
    percentages.B[currYear] = totals.all[currYear]===0 ? 0 : (percentages.B[currYear]/totals.all[currYear]*100);
  }

  // Colocar na utils
  const roundNumber = (number) => {
    return number.toString().indexOf('.') !== -1 ? number.toFixed(1) : number;
  }
  
  // Create header from data arrays
  const header = ["Ano"].concat(Object.keys(qualis))
    .concat(Object.keys(totals).map(item => item === "all" ? "Total" : "Tot " + item))
    .concat(Object.keys(percentages).map(item => "% " + item));
  const headerLegend = [""].concat(Object.keys(qualis).map(item => qualisScores[item]))
    .concat(Object.keys(totals).map(item => ""))
    .concat(Object.keys(percentages).map(item => ""));

  // Create footer from data arrays
  const footer = ["Total"].concat(Object.values(totalStats).map(number => roundNumber(number)));

  // Get statistics
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
                  // display: 'table',
                  width: '98.5%'
                }}>
                {header.map(item => <th scope="col">{item}</th>)}
              </tr>
              {score &&
                <tr style={{
                  // display: 'table',
                  width: '98.5%'
                }}>
                {headerLegend.map(item => <th scope="col">{item}</th>)}
                </tr>
              }
            </thead>
            <tbody 
              // style={{ display: 'block', maxHeight: '40vh', overflowY: 'auto' }}
            >
              {years.map((year, index) => 
                <tr style={{
                  // display: 'table',
                  width: '100%'
                }}>
                  <th scope="row">{year}</th>
                  {Object.values(qualis).map(item => <td>{roundNumber(item[index])}</td>)}
                  {Object.values(totals).map(item => <td>{roundNumber(item[index])}</td>)}
                  {Object.values(percentages).map(item => <td>{roundNumber(item[index])}</td>)}
                </tr>
              ).reverse()}
            </tbody>
            <tfoot>
              <tr style={{
                  // display: 'table',
                  width: '98.5%'
                }}>
                {footer.map(item => <th scope="col">{item}</th>)}
              </tr>
              {showStatistics && (<>
                <tr style={{
                    // display: 'table',
                    width: '98.5%'
                  }}>
                  {mean.map(item => <th scope="col">{item}</th>)}
                </tr>
                <tr style={{
                    // display: 'table',
                    width: '98.5%'
                  }}>
                  {mediana.map(item => <th scope="col">{item}</th>)}
                </tr>
                <tr style={{
                    // display: 'table',
                    width: '98.5%'
                  }}>
                  {tendencia.map(item => <th scope="col">{item}</th>)}
                </tr>
                <tr style={{
                    // display: 'table',
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
