import { createContext, ReactNode } from "react";

interface UserProps {
  name: string;
  avatartUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  signIn: () => Promise<void>;
}

export interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  async function signIn() {
    console.log("Vamos Logar!");
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user: {
          name: "Pedro Mascarenhas",
          avatartUrl: "https://github.com/pedro-drosa.png",
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
