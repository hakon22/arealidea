import { useState } from 'react';
import { Button } from 'react-bootstrap';
import ModalForm from './ModalForm.jsx';

const Articles = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="text-center">
      <Button variant="warning" onClick={() => setModalShow(true)}>Добавить новость</Button>
      <ModalForm
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <hr className="mt-4" />
    </div>
  );
};

export default Articles;
