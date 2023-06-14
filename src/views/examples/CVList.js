// reactstrap components
import {
  Container,
  Row,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import CVItem from "components/CVItem";

const CVList = () => {
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--6" fluid>
        {/* Table */}
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
