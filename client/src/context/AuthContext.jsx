import { useEffect } from "react";
import  { createContext , useState,useContext } from 'react'
import { registerRequest,loginRequest } from "../api/auth";


export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) throw new Error('useAuth must be used within an AuthProvider')
    return context;
};

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState();

    useEffect(() => {
      if (errors && errors.length > 0) { 
        const timer = setTimeout(() => {
          setErrors(null); 
        }, 5000);
        return () => clearTimeout(timer);
      }
    }, [errors]);
    

    const signup = async (user) => {
        try {
          const res = await registerRequest(user);
          if (res.status === 200) {
            setUser(res.data);
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.log(error.response);
          setErrors(error.response.data.message);
        }
      };

      const signin = async (user) => {
        try {
          const res = await loginRequest(user);
          console.log(res);
          // setUser(res.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.log(error.response.data.message);
           setErrors(error.response.data.message);
        }
      };

    
    return (
        <AuthContext.Provider value={{signup,signin,user,isAuthenticated,errors}}>
            {children}
        </AuthContext.Provider>
    )
}