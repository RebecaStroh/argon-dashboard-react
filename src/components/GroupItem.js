// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Row,
} from "reactstrap";
// core components
import CVItem from "./CVItem";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input
} from "reactstrap";
import { useState } from "react";

const GroupItem = ({
  groupName,
  authors
}) => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <Card className="shadow mt-3">
      <CardHeader className="bg-transparent" style={{ flexDirection: 'row', display: 'flex', justifyContent: "space-between" }}>
        <h3 className="mb-0">{groupName}</h3>
        <div>
          <i className="fas fa-file-export mr-2" onClick={() => { console.log("oi") }} style={{fontSize: "14px", cursor: "pointer"}} title="Exportar dados dos CVs do grupo"/>
          <i className="fas fa-trash-can mr-2" onClick={() => { console.log("oi") }} style={{fontSize: "14px", cursor: "pointer"}} title="Deletar grupo"/>
          <i className="fas fa-plus" style={{cursor: "pointer"}} onClick={toggle} title="Adicionar um CV ao grupo"/>
        </div>
      </CardHeader>
      <CardBody>
        <Row className="icon-examples">
          {authors.map(author => <CVItem authorName={author.name} CVLink={author.link} key={author.link} group={groupName}/>)}
        </Row>
      </CardBody>
      {/* Modal to add authors */}
      <Modal isOpen={modal}>
        <ModalHeader>Adicionar um novo CV ao {groupName}</ModalHeader>
        <ModalBody>
          <Input placeholder="Selecione um CV" type="text" />
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
    </Card>
  );
};

export default GroupItem;