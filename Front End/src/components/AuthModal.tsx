import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { Modal } from "react-bootstrap";

export default function AuthModal() {
   const [hasAccount, setHasAccount] = useState(true);

   const switcher = () => setHasAccount(!hasAccount);

   return (
      <Modal show={true} backdrop="static" centered className="z-2" backdropClassName="z-2" contentClassName="bg-light">
         <Modal.Header>
            <Modal.Title>{hasAccount ? "Login" : "Register"}</Modal.Title>
         </Modal.Header>
         <Modal.Body>{hasAccount ? <Login /> : <Register />}</Modal.Body>
         <Modal.Footer className="justify-content-start">
            <p>
               {hasAccount
                  ? "Do Not Have An Account? Create One"
                  : "Have An Account? LogIn"}{" "}
               <a className="link-primary pe-auto" href="#" onClick={switcher}>
                  Here
               </a>
            </p>
         </Modal.Footer>
      </Modal>
   );
}
