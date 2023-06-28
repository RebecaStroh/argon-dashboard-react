import {
  Col,
} from "reactstrap";

import {
  removerCVfromDB,
  removeCVfromGroup,
  exportCV
} from "../utils";

const CVItem = ({
  authorName,
  CVLink,
  group,
  groupName,
  updateGroups
}) => {
  function handleRemoveButton(e) {
    let result;
    if (group) { // deletar de grupo
      result = window.confirm(
        `Confirma a remoção de ${authorName} do grupo ${groupName}?`
      );
      if (result) {
        removeCVfromGroup(group, CVLink);
        updateGroups();
      } else {
        e.preventDefault();
      }
    } else { // deletar do banco
      result = window.confirm(
        `Confirma a remoção dos dados extraídos do CV de ${authorName}?\n\nUma vez confirmada, para visualizar os dados desde CV novamente, será necessário (re)abrir a página do CV no navegador.`
      );
  
      if (result) {
        removerCVfromDB(CVLink);
      } else {
        e.preventDefault();
      }
    }
  }

  function handleLinkButton(e) {
    window.open(CVLink, '_blank');
  }

  function handleExportCV() {
    exportCV(CVLink);
  }

  return (
    <Col lg="3" md="6">
      <div className="btn-icon-clipboard" style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>
        <span>{authorName}</span>
        <div className="actions">
          <i className="fas fa-external-link-alt mr-1" onClick={handleLinkButton} style={{fontSize: "14px"}} title="Ir para link externo"/>
          {!group && <i className="fas fa-file-export mr-1" onClick={handleExportCV} style={{fontSize: "14px"}} title="Exportar curriculo"/>}
          <i className={group ? "fas fa-close" : "fas fa-trash-can"} onClick={handleRemoveButton} style={{fontSize: "14px"}} title={group? "Remover curriculo do grupo" : "Remover curriculo do banco"}/>
        </div>
      </div>
    </Col>
  );
};

export default CVItem;
