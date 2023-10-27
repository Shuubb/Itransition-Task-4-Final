import { useEffect, useState } from "react";
import useAxios from "./useAxios";
import { useUserContext } from "../contexts/UserContext";

type UserInfo = {
   id: string;
   username: string;
   email: string;
   is_active: string;
   last_login: string;
   date_joined: string;
};

export default function useUserActions() {
   const [userList, setUserList] = useState<UserInfo[]>([]);
   const { authToken } = useUserContext();
   const axios = useAxios();

   useEffect(() => {
      if (authToken) updateList();
   }, [authToken]);

   function updateList() {
      axios.get("/userlist/").then((res) => {
         const userList = res.data;
         setUserList(userList);
      });
   }
   function changeStatus(id: string, status: boolean) {
      return axios
         .put(`/user/blockswitch/${id}/`, {
            blocked: status,
         })
         .then(() => {
            updateList();
         });
   }
   function remove(id: string) {
      return axios.delete(`/user/delete/${id}/`).then(() => {
         updateList();
      });
   }

   return { changeStatus, remove, userList };
}
