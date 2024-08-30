import { createContext, useState } from 'react';

export const UserContext = createContext('');

export const UserContextProvider = (props) => {
    const [token, setToken] = useState('');
    const [userName , setUserName] = useState('')
    const [email , setEmail] = useState('')
    return (
        <UserContext.Provider value={{ token, setToken , userName , setUserName , email , setEmail}}>
            {props.children}
        </UserContext.Provider>
    );
};
