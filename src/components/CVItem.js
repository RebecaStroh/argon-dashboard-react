import {
  Col,
} from "reactstrap";


const CVItem = ({
  authorName,
  CVLink
}) => {
  return (
    <Col lg="3" md="6">
      <div className="btn-icon-clipboard" style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>
        <span>{authorName}</span>
        <div class="actions">
          <i className="fas fa-external-link-alt" onClick={() => { window.open(CVLink, '_blank') }}/>
          <i className="fas fa-trash-can" onClick={() => { alert("Apagar CV"); }}/>
        </div>
      </div>
    </Col>
  );
};

export default CVItem;
