import { useState } from 'react';
import { Button } from 'react-bootstrap';
import ModalForm from './ModalForm.jsx';

const Articles = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="container">
      <div className="row">
        <div className="col d-flex justify-content-center">
          <Button variant="warning" onClick={() => setModalShow(true)}>Добавить новость</Button>
          <ModalForm
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Articles;
