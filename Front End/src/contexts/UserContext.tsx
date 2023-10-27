import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext<null | User>(null);

export function useUserContext() {
   return useContext(UserContext) as User;
}

type Props = {
   children: string | JSX.Element | JSX.Element[];
};

type User = {
   authToken: string;
   userName: string;
   remove: () => void;
   set: (authToken: string, userName: string) => void;
};

export default function UserProvider({ children }: Props) {
   const userFromLocalStorageJSON = localStorage.getItem("user");
   const user = userFromLocalStorageJSON
      ? JSON.parse(userFromLocalStorageJSON)
      : {
           authToken: "",
           userName: "",
        };
   const [userInfo, setUserInfo] = useState(user);

   function remove() {
      setUserInfo({
         authToken: "",
         userName: "",
      });
   }
   function set(authToken: string, userName: string) {
      setUserInfo({
         authToken: authToken,
         userName: userName,
      });
   }

   useEffect(() => {
      if (userInfo.authToken && userInfo.userName)
         localStorage.setItem("user", JSON.stringify(userInfo));
      else localStorage.removeItem("user");
   }, [userInfo]);

   return (
      <UserContext.Provider value={{ ...userInfo, remove, set }}>
         {children}
      </UserContext.Provider>
   );
}
