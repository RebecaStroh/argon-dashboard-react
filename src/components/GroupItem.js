// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Row,
} from "reactstrap";
// core components
import CVItem from "./CVItem";

const GroupItem = ({
  groupName,
  authorsList //TO DO
}) => {
  return (
    <Card className="shadow">
      <CardHeader className="bg-transparent">
        <h3 className="mb-0">{groupName}</h3>
      </CardHeader>
      <CardBody>
        <Row className="icon-examples">
          <CVItem authorName="Stephen Rehen" CVLink="https://react-icons.github.io/react-icons"/>
        </Row>
      </CardBody>
    </Card>
  );
};

export default GroupItem;