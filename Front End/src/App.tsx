import AuthTokenProvider from "./contexts/UserContext";

import IndexPage from "./pages/indexPage";

export default function App() {
   return (
      <AuthTokenProvider>
         <IndexPage />
      </AuthTokenProvider>
   );
}
