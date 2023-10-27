import axios from "axios";
import { useUserContext } from "../contexts/UserContext";

export default function useAxios() {
   const user = useUserContext();

   const axiosInstance = axios.create({
      baseURL: "/api",
   });

   axiosInstance.interceptors.request.use(
      (config) => {
         if (user.authToken) {
            config.headers.Authorization = `Basic ${user.authToken}`;
         }
         return config;
      },
      (error) => {
         return Promise.reject(error);
      }
   );

   axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
         if (error.response && error.response.status === 401) {
            user.remove()
         }
         return Promise.reject(error);
      }
   );

   return axiosInstance;
}
