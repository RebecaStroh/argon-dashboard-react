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

import {
  exportGroupCV,
  deleteGroup,
  addCVinGroup
} from "../utils";

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const GroupItem = ({
  groupId,
  groupName,
  allAuthors,
  authors,
  updateGroups
}) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleSaveButton = () => {
    addCVinGroup(groupId, selectedAuthors);
    toggle();
    updateGroups();
  }

  const handleCancelButton = () => {
    setSelectedAuthors([]);
    toggle();
  }

  const [selectedAuthors, setSelectedAuthors] = useState([]);

  const handleAddCVs = (event, values) => {
    setSelectedAuthors(values.map(value => value.link));
  }

  // Group functions
  const handleGroupExport = () => {
    exportGroupCV(groupId);
  }
  const handleGroupDelete = () => {
    deleteGroup(groupId);
    updateGroups();
  }

  return (
    <Card className="shadow mt-3">
      <CardHeader className="bg-transparent" style={{ flexDirection: 'row', display: 'flex', justifyContent: "space-between" }}>
        <h3 className="mb-0">{groupName}</h3>
        <div>
          <i className="fas fa-file-export mr-2" onClick={handleGroupExport} style={{fontSize: "14px", cursor: "pointer"}} title="Exportar dados dos CVs do grupo"/>
          <i className="fas fa-trash-can mr-2" onClick={handleGroupDelete} style={{fontSize: "14px", cursor: "pointer"}} title="Deletar grupo"/>
          <i className="fas fa-plus" style={{cursor: "pointer"}} onClick={toggle} title="Adicionar um CV ao grupo"/>
        </div>
      </CardHeader>
      <CardBody>
        <Row className="icon-examples">
          {authors.map(author => <CVItem authorName={author.name} CVLink={author.link} key={author.link} group={groupId} groupName={groupName} updateGroups={updateGroups}/>)}
        </Row>
      </CardBody>
      {/* Modal to add authors */}
      <Modal isOpen={modal}>
        <ModalHeader>Adicionar um novo CV ao {groupName}</ModalHeader>
        <ModalBody>
          <Autocomplete
            onChange={handleAddCVs}
            multiple
            options={allAuthors}
            getOptionLabel={(option) => option.name}
            defaultValue={[]}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Selecione um CV"
              />
            )}
            sx={{
              width: '90%',
              '& .MuiButtonBase-root': {
                color: '#415e98',
              },
              '& .MuiInputBase-input': {
                color: '#415e98',
              },
              '& fieldset': {
                border: "none",
              },
              '& .MuiInputBase-root > .MuiButtonBase-root': {
                border: '1px #415e98 solid',
                backgroundColor: 'transparent',
                '& .MuiSvgIcon-root': {
                  color: "#415e98"
                }
              }
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSaveButton}>
            Salvar
          </Button>{' '}
          <Button color="secondary" onClick={handleCancelButton}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </Card>
  );
};

export default GroupItem;