import { ReactNode, createContext, useState } from 'react';

const AuthContext = createContext({});

interface Props {
    children?: ReactNode;
    // any props that come into the component
}

export const AuthProvider = ({ children }: Props) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
