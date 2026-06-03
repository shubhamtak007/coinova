"use client";

import { createContext, useContext, ReactNode, useState, SetStateAction, Dispatch } from 'react';
import { User } from '@/interfaces/user.interface';

type UserContextProviderProps = {
    children: ReactNode
}

type UserContextType = {
    user: User | null,
    setUser: Dispatch<SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserContextProvider = ({ children, }: UserContextProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

const useUser = (): UserContextType => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useUser must be in UserContextProvider');
    }

    return context;
}

export { UserContextProvider, useUser }