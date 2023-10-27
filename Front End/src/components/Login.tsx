import { Form, Button, InputGroup } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

type Values = {
   username: string;
   password: string;
};

export default function Register() {
   const { login } = useAuth();

   const validationSchema = Yup.object().shape({
      username: Yup.string().required(),
      password: Yup.string().required(),
   });

   const initialValues: Values = {
      username: "",
      password: "",
   };

   const handleSubmit = async (
      { username, password }: Values,
      { setStatus }: FormikHelpers<Values>
   ) => {
      try {
         await login(username, password);
      } catch (err: any) {
         if (err.response?.status === 401) {
            setStatus(err.response.data.message);
         }
      }
   };

   return (
      <Formik
         validationSchema={validationSchema}
         initialValues={initialValues}
         onSubmit={handleSubmit}
      >
         {({ handleSubmit, handleChange, values, touched, errors, status }) => (
            <Form noValidate onSubmit={handleSubmit}>
               <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <InputGroup>
                     <InputGroup.Text>#</InputGroup.Text>
                     <Form.Control
                        type="text"
                        name="username"
                        onChange={handleChange}
                        value={values.username}
                        placeholder="Username"
                        isInvalid={touched.username && !!errors.username}
                     />
                     <Form.Control.Feedback type="invalid">
                        {errors.username}
                     </Form.Control.Feedback>
                  </InputGroup>
               </Form.Group>

               <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                     type="password"
                     name="password"
                     onChange={handleChange}
                     value={values.password}
                     placeholder="Password"
                     isInvalid={touched.password && !!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                     {errors.password}
                  </Form.Control.Feedback>
               </Form.Group>
               <div className="text-danger">{status}</div>

               <br />
               <Button type="submit">Submit form</Button>
            </Form>
         )}
      </Formik>
   );
}
