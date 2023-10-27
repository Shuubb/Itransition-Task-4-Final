import { Form, Button, InputGroup } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

type Values = {
   username: string;
   email: string;
   password: string;
};

export default function Register() {
   const { register } = useAuth();

   const validationSchema = Yup.object().shape({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
         .required("Email is required")
         .matches(
            /[-a-zA-Z0-9._]+@[-a-zA-Z0-9.]+\.[a-zA-Z]{2,4}/,
            "Enter a valid email address"
         ),
      password: Yup.string().required("Password is required"),
   });

   const initialValues: Values = {
      username: "",
      email: "",
      password: "",
   };

   const handleSubmit = async (
      values: Values,
      { setFieldError }: FormikHelpers<Values>
   ) => {
      try {
         await register(values.username, values.email, values.password);
      } catch (err: any) {
         if (err.response?.status === 422) {
            const { data } = err.response;
            for (const fieldKey in data) {
               setFieldError(fieldKey, data[fieldKey][0]);
            }
         }
      }
   };

   return (
      <Formik
         validationSchema={validationSchema}
         initialValues={initialValues}
         onSubmit={handleSubmit}
      >
         {({ handleSubmit, handleChange, values, touched, errors }) => (
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
                        isValid={touched.username && !errors.username}
                        isInvalid={touched.username && !!errors.username}
                     />
                     <Form.Control.Feedback type="invalid">
                        {errors.username}
                     </Form.Control.Feedback>
                  </InputGroup>
               </Form.Group>

               <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                     type="email"
                     name="email"
                     onChange={handleChange}
                     value={values.email}
                     placeholder="Email"
                     as={Form.Control}
                     isValid={touched.email && !errors.email}
                     isInvalid={touched.email && !!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                     {errors.email}
                  </Form.Control.Feedback>
               </Form.Group>

               <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                     type="password"
                     name="password"
                     onChange={handleChange}
                     value={values.password}
                     placeholder="Password"
                     isValid={touched.password && !errors.password}
                     isInvalid={touched.password && !!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                     {errors.password}
                  </Form.Control.Feedback>
               </Form.Group>
               <br />
               <Button type="submit">Submit form</Button>
            </Form>
         )}
      </Formik>
   );
}
