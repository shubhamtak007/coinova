"use client";

import { createContext, useContext, ReactNode, useState, SetStateAction, Dispatch, useEffect } from 'react';
import { User } from '@/interfaces/account-centre.interface';
import { Spinner } from '@/components/ui/spinner';
import { retrieveProfile } from '@/services/user.service';
import { GlobeOff } from 'lucide-react';
import axios, { AxiosError, isAxiosError } from 'axios';

type UserContextProviderProps = {
    children: ReactNode,
    currentUser?: User
}

type Online = true | false;

type UserContextType = {
    user: User | null,
    setUser: Dispatch<SetStateAction<User | null>>,
    isOnline: Online,
    setIsOnline: Dispatch<SetStateAction<Online>>
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserContextProvider = ({ children, currentUser }: UserContextProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isOnline, setIsOnline] = useState<Online>(navigator.onLine);
    const [fetchingDetails, setFetchingDetails] = useState<boolean>(true);

    useEffect(() => {
        if (navigator.onLine === false) return;

        async function fetchUserDetails() {
            try {
                const response = await retrieveProfile();
                setUser(response.data.data);
            } catch (error: unknown) {
                if ((isAxiosError(error) && !error.response) || (error instanceof Error && error.message === 'Network Error')) {
                    setIsOnline(false);
                }

                console.error(error);
            } finally {
                setFetchingDetails(false);
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

    if (fetchingDetails) {
        return (
            <div className="hz-and-vert-center">
                <Spinner className="size-20" />
            </div>
        );
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