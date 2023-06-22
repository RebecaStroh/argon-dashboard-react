import {
  Col,
} from "reactstrap";


const CVItem = ({
  authorName,
  CVLink,
}) => {
  function handleClearButton(e) {
    // confirm remove CV data action
    var result = window.confirm(
      `Confirma a remoção dos dados extraídos do CV de ${authorName}?\n\nUma vez confirmada, para visualizar os dados desde CV novamente, será necessário (re)abrir a página do CV no navegador.`
    );

    // if (result) {
    //   // delete CV data from lattes data and save it back to local storage area
    //   deleteLattesAuthorData(author);
    //   handleAuthorSelector("");
    //   setViewType("");

    //   delete authors[author];

    //   props.updateAuthorsList(authors);
  
    //   console.log('remove CV data action confirmed!');
    // } else {
    //   e.preventDefault();
    // }
  }
  return (
    <Col lg="3" md="6">
      <div className="btn-icon-clipboard" style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>
        <span>{authorName}</span>
        <div className="actions">
          <i className="fas fa-external-link-alt" onClick={() => { window.open(CVLink, '_blank') }}/>
          <i className="fas fa-trash-can" onClick={() => { alert("Apagar CV ou remover do grupo"); }}/>
        </div>
      </div>
    </Col>
  );
};

export default CVItem;
