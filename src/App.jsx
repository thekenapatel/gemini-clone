import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/firebase";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import './components/theme.css';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Sidebar />
      <Main user={user} />
    </>
  );
};

export default App;



