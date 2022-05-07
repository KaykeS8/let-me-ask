import { createContext, useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home";
import { NewRoomm } from "./pages/NewRoom";

import { auths } from "./services/firebase";
import { firebase } from './services/firebase'

type User = {
  id: string,
  name: string,
  avatar: string
}
type AuthContextType = {
  user: User | undefined;
  signWithGoogle: () => Promise<void>;
}


export const AuthContext = createContext({} as AuthContextType)

const App = () => {
  const [user, setUser] = useState<User>()

  const signWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auths.signInWithPopup(provider)

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;
      if (!displayName || !photoURL) {
        throw new Error("Missing information from google account")
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }

  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, signWithGoogle }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/new" element={<NewRoomm />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  )
}
export default App;
