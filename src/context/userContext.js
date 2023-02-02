import React,{useContext,useState,useEffect} from 'react'

const UserContext = React.createContext()

export const useUser = () => {
    return useContext(UserContext)
}


export const UserProvider = ({children}) => {
    const [user,setUser] = useState(()=>{
        if(localStorage.getItem('DebuggerUser') === null){
            return null
        }
        else{
            return localStorage.getItem('DebuggerUser')
        }
    })

    useEffect(()=>{
        if(user !== null || user !== undefined || user !== '') {
            localStorage.setItem('DebuggerUser',user)
        }
    },[user])

    const value = {
        user,setUser
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )

}
