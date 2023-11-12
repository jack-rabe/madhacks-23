import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./navbar";
import { Button } from "./ui/button";

// @ts-ignore
export default function Layout({ children }) {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } =
    useAuth0();

  return (
    <div>
      <Navbar />
      {isAuthenticated ? (
        <main>{children}</main>
      ) : !isLoading ? (
        <Button onClick={() => loginWithRedirect()}>Login</Button>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
