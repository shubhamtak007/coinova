"use client";

import { createContext, useContext, ReactNode, useState, SetStateAction, Dispatch, useEffect } from 'react';
import { User } from '@/interfaces/user.interface';
import { useLoading } from './loading.context';
import UserService from '@/services/user.service';


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
    const { setIsLoading } = useLoading();

    useEffect(() => {
        fetchProfile();
    }, []);

    async function fetchProfile() {
        setIsLoading(true);

        try {
            const response = await UserService.retrieveProfile();
            setUser(response.data.data);
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    }

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