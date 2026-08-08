"use client";

import { createContext, useContext, ReactNode, useState, SetStateAction, Dispatch, useEffect } from 'react';
import { User } from '@/interfaces/account-centre.interface';
import { retrieveProfile } from '@/services/user.service';
import { GlobeOff } from 'lucide-react';
import { isAxiosError } from 'axios';
import { useLoading } from './loading.context';

type UserContextProviderProps = {
    children: ReactNode
}

type UserContextType = {
    user: User | null,
    setUser: Dispatch<SetStateAction<User | null>>,
    isOnline: boolean,
    setIsOnline: Dispatch<SetStateAction<boolean>>
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
    const { setIsLoading } = useLoading();

    useEffect(() => {
        if (navigator.onLine === false) {
            setIsLoading(false);
            return;
        }

        async function fetchUserDetails() {
            try {
                setIsLoading(true);
                const response = await retrieveProfile();
                setUser(response.data.data);
            } catch (error: unknown) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchUserDetails();
    }, []);

    if (isOnline === false) {
        return <div className="hz-and-vert-center flex items-center">
            <GlobeOff />
            <div className="text-[23px] ml-[8px]">You're offline</div>
        </div>;
    }

    return (
        <UserContext.Provider
            value={{ user, setUser, isOnline, setIsOnline }}
        >
            {children}
        </UserContext.Provider>
    );
}

const useUser = (): UserContextType => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useUser must be in UserContextProvider');
    }

    return context;
}

export { UserContextProvider, useUser }