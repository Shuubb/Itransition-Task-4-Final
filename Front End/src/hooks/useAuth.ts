import useAxios from "./useAxios";
import { useUserContext } from "../contexts/UserContext";

export function useAuth() {
   const user = useUserContext();
   const axios = useAxios();

   function login(username: string, password: string) {
      return axios
         .post("/login/", {
            username,
            password,
         })
         .then((res) => {
            user.set(res.data.authToken, username);
         });
   }

   function logout() {
      user.remove();
   }

   function register(username: string, email: string, password: string) {
      return axios
         .post("/register/", {
            username: username,
            email: email,
            password: password,
         })
         .then(() => login(username, password));
   }

   return {
      login,
      logout,
      register,
   };
}
