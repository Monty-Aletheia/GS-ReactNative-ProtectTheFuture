import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import api from "../service/api";
import { createUserWithEmailAndPassword, FirebaseAuthTypes, getAuth, signInWithEmailAndPassword } from "@react-native-firebase/auth";
import { router } from "expo-router";
import { Address } from "../types/address";
import { User } from "../types/user";

type AuthContextType = {
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (
    name: string,
    email: string,
    password: string,
    address: Address,
  ) => Promise<boolean>;
  signOut: (auth: FirebaseAuthTypes.Module) => Promise<void>;
  updateUser: (newName: string) => Promise<void>;
  getUserByFirebaseId: () => Promise<void>;
  user: User | null;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [userFirebaseId, setUserFirebaseId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

    const user = response.user;
    const id = user.uid;

    await AsyncStorage.setItem("@userFirebaseId", id);

    setUserFirebaseId(id);

    router.navigate("/profile");
    console.log("User account signed in!");

    return true;
  } catch (error) {
    console.error("Erro no login:", error);
    return false;
  } finally{
    setIsLoading(false);
  }
};


const signUp = async (
    name: string,
    email: string,
    password: string,
    address: Address
  ) => {

    let backendUserId: string | null = null;

    setIsLoading(true);

    try {
      const response = await api.post("User/withAddress", {
        name,
        email,
        password,
        address
      });

      if (response.status == 200) {
        backendUserId = response.data.id;
        const status = response.status
        console.log("Usuario cadastrado", status);
        
        try {
        const firebaseResponse = await createUserWithEmailAndPassword(
          getAuth(),
          email,
          password
        );

        console.log("Usuário criado no Firebase:", firebaseResponse.user.uid);
        router.navigate("/");
        return true;

      }catch (firebaseError: any) {
            console.error("Erro ao criar usuário no Firebase:", firebaseError);
            
            if (backendUserId) {
            try {
              await api.delete(`User/${backendUserId}`);
              console.log("Usuário removido do backend após falha no Firebase");
            } catch (deleteError) {
              console.error("Erro ao excluir usuário do backend:", deleteError);
            }}   
            
            return false;
        } finally {
            setIsLoading(false);
        }



      } else {
        console.log("Falha ao cadastrar no backend:", response.status);
        return false;
      }
    } catch (error: any) {
      console.error("Erro durante cadastro no backend:", error.message);
      
      return false;
    } finally{
        setIsLoading(false);
    }
  };


  const getUserByFirebaseId = async () => {
    try {
      const response = await api.get(`/User/${userFirebaseId}`);
      const data = response.data;
      setUser(data);
    } catch (error) {
      console.error("Erro ao buscar dentista por ID:", error);
    }
  };

  const signOut = async (auth: FirebaseAuthTypes.Module) => {
    try {
    await signOut(auth);

    await AsyncStorage.removeItem("@userFirebaseId"); 

    setUserFirebaseId(""); 

    router.replace("/"); 

    console.log("User signed out!");
  } catch (error) {
    console.error("Erro ao fazer sign out:", error);
  }
};


const updateUser = async (newName: string) => {
    try {
      const response = await api.put(`/User/${user?.id}`, {
        name: newName,
        email: user?.email,
        password: user?.password,
      });

      if (response.status === 200) {
        getUserByFirebaseId();
        setUser(response.data);
      }
    } catch (error) {
      console.error("Erro ao atualizar dentista: ", error);
    }
  };
  

  
const value = {
    signIn,
    signUp,
    signOut,
    getUserByFirebaseId,
    updateUser,
    user,
    isLoading
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
