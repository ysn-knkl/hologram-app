import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

export interface AppContextInterface {
  user: FirebaseAuthTypes.User | null;
  setUser: any
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AppContextInterface | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email: string, password: string) => {
          try {
            await auth()
              .signInWithEmailAndPassword(email, password)
              .then((te) => console.log(te, 123123));
          } catch (error) {
            console.log(error);
          }
        },
        register: async (email: string, password: string) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then((te) => console.log(te, 44444));
          } catch (error) {
            console.log(error);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (error) {
            console.log(error);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
