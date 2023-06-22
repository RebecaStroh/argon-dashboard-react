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
  authors
}) => {

  return (
    <Card className="shadow mt-3">
      <CardHeader className="bg-transparent" style={{ flexDirection: 'row', display: 'flex', justifyContent: "space-between" }}>
        <h3 className="mb-0">{groupName}</h3>
        <i className="fas fa-plus" style={{cursor: "pointer"}} onClick={() => { alert("Inserir novo author"); }}/>
      </CardHeader>
      <CardBody>
        <Row className="icon-examples">
          {authors.map(author => <CVItem authorName={author.name} CVLink={author.link} key={author.link}/>)}
        </Row>
      </CardBody>
    </Card>
  );
};

export default GroupItem;