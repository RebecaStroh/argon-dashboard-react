// reactstrap components
import {
  Container,
  Row,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
} from "reactstrap";
// core components
import GroupItem from "components/GroupItem";

const GroupList = () => {
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex">
            <FormGroup className="w-100 mb-1">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" />
              </InputGroup>
            </FormGroup>
          </Form>
        </Container>
      </Navbar>
      <div className="header bg-gray pb-8 pt-5 pt-md-8">
      </div>
      {/* Page content */}
      <Container className="mt--9" fluid>
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
