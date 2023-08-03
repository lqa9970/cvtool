import { createContext, useContext, useMemo } from "react";
import { useOktaAuth } from "@okta/okta-react";
import useUserByEmail from "../hooks/useUserByEmail";
import { EmployeeUser } from "../types/types";

type UserContextValue = {
  user: EmployeeUser | null;
};

type UserProviderProps = {
  children: React.ReactNode;
};

const defaultUserContextValue: UserContextValue = {
  user: null,
};

const UserContext = createContext<UserContextValue>(defaultUserContextValue);

function UserProvider({ children }: UserProviderProps) {
  const { authState } = useOktaAuth();
  const userEmail = authState?.idToken?.claims.email;
  const [user] = useUserByEmail(userEmail || "");
  const userContextValue = useMemo(() => ({ user }), [user]);
  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
}

const useUserContext = (): UserContextValue => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider.");
  }
  return context;
};

export { UserProvider, useUserContext };
