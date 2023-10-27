import MyNavbar from "../components/Navbar";
import AuthModal from "../components/AuthModal";
import MyTable from "../components/Table";
import { useUserContext } from "../contexts/UserContext";

export default function IndexPage() {
   const { authToken } = useUserContext();

   return (
      <>
         <div className="bg-light w-100 h-100 position-absolute">
            <MyNavbar />

            <MyTable />

            {!authToken && <AuthModal />}
         </div>
      </>
   );
}
