import { useEffect, useState } from "react";
import { Button, Placeholder } from "react-bootstrap";
import Table from "react-bootstrap/esm/Table";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useUserContext } from "../contexts/UserContext";
import useUserActions from "../hooks/useUserActions";
import useUniqueStringList from "../hooks/useUniqueStringList";

export default function MyTable() {
   const { authToken } = useUserContext();
   const { changeStatus, remove, userList } = useUserActions();
   const choosenUsers = useUniqueStringList([]);
   const [buttonsDisabled, setButtonsDisabled] = useState(false);

   useEffect(() => {
      choosenUsers.clear();
   }, [authToken]);

   async function onBlock() {
      setButtonsDisabled(true);
      const promises = choosenUsers.map(async (id) => {
         await changeStatus(id, true);
      });
      await Promise.all(promises);
      setButtonsDisabled(false);
      choosenUsers.clear();
   }

   async function onUnblock() {
      setButtonsDisabled(true);
      const promises = choosenUsers.map(async (id) => {
         await changeStatus(id, false);
      });
      await Promise.all(promises);
      setButtonsDisabled(false);
      choosenUsers.clear();
   }

   async function onDelete() {
      setButtonsDisabled(true);
      const promises = choosenUsers.map(async (id) => {
         await remove(id);
      });
      await Promise.all(promises);
      setButtonsDisabled(false);
      choosenUsers.clear();
   }

   return (
      <form className="mx-5 d-flex flex-column justify-content-center h-75">
         <div className="m-2 mt-5">
            <Button onClick={onBlock} disabled={buttonsDisabled}>
               <AiFillLock /> Block
            </Button>{" "}
            <Button onClick={onUnblock} disabled={buttonsDisabled}>
               <AiFillUnlock /> Unblock
            </Button>{" "}
            <Button
               onClick={onDelete}
               disabled={buttonsDisabled}
               variant="danger"
            >
               <BsFillTrash3Fill /> Delete
            </Button>{" "}
         </div>

         <Table striped bordered hover responsive variant="dark">
            <thead>
               <tr>
                  <th>
                     <input
                        type="checkbox"
                        onChange={(e) =>
                           Object.entries(userList).map(([, user]) => {
                              e.target.checked
                                 ? choosenUsers.addString(user.id)
                                 : choosenUsers.removeString(user.id);
                           })
                        }
                     />
                  </th>
                  <th>User ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Last Login</th>
                  <th>Register Time</th>
                  <th>Status</th>
               </tr>
            </thead>
            <tbody>
               {!!authToken ? (
                  userList.map((user, index) => (
                     <tr key={index}>
                        <td>
                           <input
                              type="checkbox"
                              checked={choosenUsers.includes(user.id)}
                              onChange={() =>
                                 choosenUsers.includes(user.id)
                                    ? choosenUsers.removeString(user.id)
                                    : choosenUsers.addString(user.id)
                              }
                           />
                        </td>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.last_login}</td>
                        <td>{user.date_joined}</td>
                        <td>{user.is_active ? "1" : "0"}</td>
                     </tr>
                  ))
               ) : (
                  <tr>
                     <td>
                        <input type="checkbox" />
                     </td>
                     {[...Array(6)].map((_, index) => (
                        <td key={index}>
                           <Placeholder animation="wave">
                              <Placeholder className="w-75" />
                           </Placeholder>
                        </td>
                     ))}
                  </tr>
               )}
            </tbody>
         </Table>
      </form>
   );
}
