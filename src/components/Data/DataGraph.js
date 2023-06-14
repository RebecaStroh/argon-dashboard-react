
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
} from "reactstrap";

// core components

const DataGraph = ({
  graphName
}) => {
  const years = Array.from({ length: 2023 - 1993 + 1 }, (_, index) => 1993 + index);
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

  const datasets = [
    {
      label: 'A',
      data: [25, 20, 30, 22, 17, 29,25, 20, 30, 22, 17, 29,25, 20, 30, 22, 17, 29],
      backgroundColor: '#415e98',
    },
    {
      label: 'B',
      data: [25, 20, 30, 22, 17, 29,25, 20, 30, 22, 17, 29,25, 20, 30, 22, 17, 29],
      backgroundColor: '#657cab',
    },
    {
      label: 'C',
      data: [25, 20, 30, 22, 17, 29,25, 20, 30, 22, 17, 29,25, 20, 30, 22, 17, 29],
      backgroundColor: '#657cEb',
    }
  ]

  const chartData = {
    options: {
      plugins: {
        // annotation: {
        //   annotations: lineAnnotations
        // },
        legend: {
          position: 'top',
        },
      },
      // responsive: true,
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false,
          },
        },
        y: {
          stacked: true,
          grid: {
            display: false,
          },
        },
      },
      borderWidth: 1,
      minBarThickness: 5,
      maxBarThickness: 12,
    },
    data: {
      labels: years,
      datasets: datasets,
    },
  };

  return (
    <Row>
      <Col className="mb-5 mb-xl-0" xl="12">
        <Card className="shadow">
          <CardHeader className="bg-transparent">
            <Row className="align-items-center">
              <div className="col">
                <h2 className="mb-0">{graphName}</h2>
              </div>
            </Row>
          </CardHeader>
          <CardBody>
            {/* Chart */}
            <div className="chart">
              <Bar
                data={chartData.data}
                options={chartData.options}
              />
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default DataGraph;
