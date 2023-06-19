import { useFormik } from 'formik';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';

const Articles = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      task: '',
    },
    onSubmit: async (values) => {
      const res = await axios.post('http://localhost:3001/api/tasksAdd', values);
      console.log(res);
    },
  });

  return (
    <Form
      onSubmit={formik.handleSubmit}
      className="w-50"
    >
      <h1 className="text-center mb-4">Добавление задачи</h1>
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
            placeholder="Введите заголовой задачи"
            required
          />
          <Form.Control.Feedback type="invalid" tooltip placement="right">
            {formik.errors.password}
          </Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="form-floating mb-3" controlId="task">
        <FloatingLabel className={formik.values.task && 'filled'} label="Задача" controlId="task">
          <Form.Control
            className="mb-2"
            onChange={formik.handleChange}
            value={formik.values.task}
            disabled={formik.isSubmitting}
            isInvalid={formik.errors.task && formik.touched.task}
            onBlur={formik.handleBlur}
            name="task"
            placeholder="Введите задачу"
            required
          />
          <Form.Control.Feedback type="invalid" tooltip placement="right">
            {formik.errors.task}
          </Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
      <Button variant="outline-primary" className="w-100" type="submit">Добавить</Button>
    </Form>
  );
};

export default Articles;
