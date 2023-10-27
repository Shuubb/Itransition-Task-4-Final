import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { useUserContext } from "../contexts/UserContext";

export default function MyNavbar() {
   const { logout } = useAuth();
   const { userName } = useUserContext();

   return (
      <>
         <Navbar expand="lg" className="bg-dark text-light shadow">
            <Container className="justify-content-end">
               <p className="m-0">
                  Hello, {userName ?? "Stranger"}!{" "}
                  <Button onClick={logout}>Logout</Button>
               </p>
            </Container>
         </Navbar>
      </>
   );
}
