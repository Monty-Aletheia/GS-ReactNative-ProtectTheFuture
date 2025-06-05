import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import api from "../service/api";
import { createUserWithEmailAndPassword, FirebaseAuthTypes, getAuth, signInWithEmailAndPassword, signOut } from "@react-native-firebase/auth";
import { router } from "expo-router";
import { Address } from "../types/address";
import { User } from "../types/user";
import { UserResponse } from "../types/userResponse";

type AuthContextType = {
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (
    name: string,
    email: string,
    password: string,
    address: Address,
  ) => Promise<boolean>;
  signOutProvider: () => void;
  updateUser: (newName: string) => Promise<boolean>;
  getUserByFirebaseId: (pushToken: string) => Promise<UserResponse | null>;
  user: User | null;
  isLoading: boolean;
  userFirebaseId: string;
  userResponse: UserResponse | null;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [userFirebaseId, setUserFirebaseId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userResponse, setUserResponse] = useState<UserResponse | null>(null);
  const [user, setUser] = useState<User | null>(null);

useEffect(() => {
    const loadStorageData = async () => {
      try {
        const storedUserFirebaseId = await AsyncStorage.getItem("@userFirebaseId");

        if (storedUserFirebaseId === "true") {
          setUserFirebaseId(storedUserFirebaseId);
        }

      } catch (e) {
        console.error("Erro ao carregar dados do AsyncStorage", e);
      } 
    }}, []);

    
const signIn = async (email: string, password: string) => {

  setIsLoading(true);
  try {
    const auth = getAuth();
    const response = await signInWithEmailAndPassword(auth, email, password);

    console.log("Usuário autenticado com sucesso:", response.user.uid);
    
    const user = response.user;
    const id = user.uid;

    setAsyncStorage(id);
    
    setUserFirebaseId(id);

    console.log("User account signed in!");

    return true;
  } catch (error) {
    console.error("Erro no login:", error);
    return false;
  } finally{
    setIsLoading(false);
  }
};

async function setAsyncStorage(id: string) {
  await AsyncStorage.setItem("@userFirebaseId", id);

}

const signUp = async (
    name: string,
    email: string,
    password: string,
    address: Address
  ) => {



    setIsLoading(true);

    const firebaseResponse = await createUserWithEmailAndPassword(
          getAuth(),
          email,
          password
        );

    const firebaseId = firebaseResponse.user.uid;

    try {     
            const response = await api.post("User/withAddress", {
              firebaseId: firebaseId,
              name,
              email,
              password,
              address
            });

            console.log("Resposta do backend:", response.status);
            
            if (response.status == 201) {
              const status = response.status
              console.log("Usuario cadastrado no backend", status);
              return true;
            } else {
              console.error("Erro ao cadastrar usuário no backend:", response.status);
              return false;

            }

          } catch (error) {
            console.error("Erro no backend:", error);
            return false;
          } finally {
            setIsLoading(false);
          }

  };


  const getUserByFirebaseId = async (pushToken: string) => {
        
    try {
      const response = await api.get(`/User`);
      const users = response.data;
      
      const user = users.find((item: any) => item.user.firebaseId === userFirebaseId);
      setUserResponse(user);
      return user;
      
      
    } catch (error) {
      console.error("Erro ao buscar user por ID:", error);
      return null;
    }
    
  };

  const signOutProvider = async () => {
    
    try {
      const deviceId = await AsyncStorage.getItem("@deviceId")
      const respose = await api.delete(`/Device/${deviceId}`)
      if (respose.status === 204) {
        console.log("Device deleted successfully");
        setUserFirebaseId(""); 
        setUserResponse(null);
      }
    } catch (error) {
      console.error("Erro ao deletar device:", error);
    }
    
};


const updateUser = async (newName: string) => {
    try {
      const response = await api.put(`/User/${userResponse?.user.id}`, {
        name: newName,
      });

      if (response.status === 204) {
        getUserByFirebaseId(userFirebaseId);
        setUser(response.data);
        return true
      } else {
        console.error("Erro ao atualizar usuário:", response.status);
        return false;
      }
    } catch (error) {
      console.error("Erro ao atualizar dentista: ", error);
      return false;
    }
  };
  

  
const value = {
    signIn,
    signUp,
    signOutProvider,
    getUserByFirebaseId,
    updateUser,
    user,
    isLoading,
    userFirebaseId,
    userResponse
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("Precisa existir o contexto");
  }

  return context;
};

export default AuthProvider;
