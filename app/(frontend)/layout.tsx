import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import NavigationWrapper from '@/components/layout/loading-bar';
import { UserContextProvider } from "@/contexts/user.context";
import { LoadingContextProvider } from '@/contexts/loading.context';

export default function Layout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="body-wrapper">
            <LoadingContextProvider>
                <NavigationWrapper>
                    <UserContextProvider>
                        <Header />

                        <main className="main-content">
                            <div className="container">
                                {children}
                            </div>
                        </main>

                        <Footer />
                    </UserContextProvider>
                </NavigationWrapper>
            </LoadingContextProvider>
        </div>
    );
}
