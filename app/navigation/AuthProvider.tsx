import React, { createContext, Dispatch, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";

export interface AppContextInterface {
  user: FirebaseAuthTypes.User | null;
  setUser: Dispatch<FirebaseAuthTypes.User | null>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
type Props = {
  children: React.ReactNode;
};
export const AuthContext = createContext<AppContextInterface | null>(null);

export const AuthProvider = (props: Props) => {
  const { children } = props;
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email: string, password: string) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (error) {
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: "ERROR",
              button: "ok",
              closeOnOverlayTap: true,
            });
          }
        },
        register: async (email: string, password: string) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (error) {
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: "ERROR",
              button: "ok",
              closeOnOverlayTap: true,
            });
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (error) {
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: "ERROR",
              button: "ok",
              closeOnOverlayTap: true,
            });
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
