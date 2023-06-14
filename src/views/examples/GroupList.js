// reactstrap components
import {
  Container,
  Row,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import GroupItem from "components/GroupItem";

const GroupList = () => {
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--6" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <GroupItem groupName="Grupo A"/>
            <GroupItem groupName="Grupo B"/>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default GroupList;
