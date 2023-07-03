import { useState } from 'react';
import { Button } from 'react-bootstrap';
import ModalForm from './ModalForm.jsx';

const Articles = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant="warning" onClick={() => setModalShow(true)}>Добавить новость</Button>
      <ModalForm
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <hr />
    </>
  );
};

export default Articles;
