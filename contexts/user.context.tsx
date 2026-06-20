"use client";

import { createContext, useContext, ReactNode, useState, SetStateAction, Dispatch, useEffect } from 'react';
import { User } from '@/interfaces/user.interface';
import { Spinner } from '@/components/ui/spinner';
import UserService from '@/services/user.service';

type UserContextProviderProps = {
    children: ReactNode,
    currentUser?: User
}

type UserContextType = {
    user: User | null,
    setUser: Dispatch<SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserContextProvider = ({ children, currentUser }: UserContextProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [fetchingDetails, setFetchingDetails] = useState<boolean>(true);

    useEffect(() => {
        async function fetchUserDetails() {
            try {
                const response = await UserService.retrieveProfile();
                setUser(response.data.data);
            } catch (error) {

            } finally {
                setFetchingDetails(false);
            }
        }

        fetchUserDetails();
    }, []);

    if (fetchingDetails) return (
        <div className="hz-and-vert-center">
            <Spinner className="size-20" />
        </div>
    )

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