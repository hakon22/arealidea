import {
  Button, Form, FloatingLabel, Modal,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';

const ModalForm = (props) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      article: '',
    },
    onSubmit: async (values) => {
      const res = await axios.post('http://localhost:3001/api/article-add', values);
      console.log(res);
    },
  });

  const { show, onHide } = props;

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="ps-32 mx-auto">
          <h1 className="mb-4">Добавление новости</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={formik.handleSubmit}
          className="mx-auto col-9"
        >
          <Form.Group className="form-floating mb-3" controlId="title">
            <FloatingLabel className={formik.values.title && 'filled'} label="Заголовок" controlId="title">
              <Form.Control
                className="mb-2"
                onChange={formik.handleChange}
                value={formik.values.title}
                autoFocus
                disabled={formik.isSubmitting}
                isInvalid={formik.errors.title && formik.touched.title}
                onBlur={formik.handleBlur}
                name="title"
                placeholder="Введите заголовок новости"
                required
              />
              <Form.Control.Feedback type="invalid" tooltip placement="right">
                {formik.errors.title}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="form-floating mb-3" controlId="article">
            <FloatingLabel className={formik.values.article && 'filled'} label="Новость" controlId="article">
              <Form.Control
                className="h-75 mb-2"
                onChange={formik.handleChange}
                value={formik.values.article}
                disabled={formik.isSubmitting}
                isInvalid={formik.errors.article && formik.touched.article}
                onBlur={formik.handleBlur}
                name="article"
                placeholder="Введите новость"
                as="textarea"
                rows={5}
                required
              />
              <Form.Control.Feedback type="invalid" tooltip placement="right">
                {formik.errors.article}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div className="col-9">
          <Button variant="primary" className="w-100" type="submit">Добавить</Button>
        </div>
        <Button variant="secondary" onClick={onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalForm;
