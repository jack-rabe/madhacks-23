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
        <>
          <div className="text-center m-4 text-2xl">
            Log in to start learning what it means to be a Cheesehead
          </div>
          <div className="flex justify-center m-4 mt-8">
            <Button className="text-xl p-4" onClick={() => loginWithRedirect()}>
              Login
            </Button>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
