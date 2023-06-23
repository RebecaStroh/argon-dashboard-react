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
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap";
// core components
import GroupItem from "components/GroupItem";
import { useState } from "react";

const GroupList = ({
  authors,
  groups
}) => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex">
            <FormGroup className="w-100 mb-1">
              <InputGroup className="input-group-alternative" style={{ marginRight: "15px", border: 'none', backgroundColor: 'white' }}>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" style={{ color: "#415e98" }}/>
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text"  style={{ color: "#415e98" }}/>
              </InputGroup>
            </FormGroup>
          </Form>
          <Button
            color="white"
            onClick={toggle}
            size="sm"
            style={{
              width: '160px',
              alignSelf: 'flex-start',
              color: '#415e98'
            }}
          >
            Criar novo grupo
          </Button>
        </Container>
      </Navbar>
      <div className="header pb-8 pt-5 pt-md-8">
      </div>
      {/* Page content */}
      <Container className="mt--9" fluid>
        <Row>
          <div className="col">
            {Object.entries(groups).map(group =>
              <GroupItem
                key={group[0]}
                groupName={group[1].name}
                authors={group[1].authors.map(authorLink => ({link: authorLink, name: authors[authorLink].name}))}
              />
            )}
          </div>
        </Row>
      </Container>

      {/* New group Modal */}
      <Modal isOpen={modal}>
        <ModalHeader>Adicionar um novo Grupo</ModalHeader>
        <ModalBody>
          <Input placeholder="Nome do grupo" type="text" />
          <Input multiple placeholder="Selecione um CV" type="text" />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Salvar
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

    </>
  );
};

export default GroupList;
