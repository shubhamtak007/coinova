import NavigationWrapper from '@/components/layout/navigation-wrapper';
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { UserContextProvider } from "@/contexts/user.context";
import { LoadingContextProvider } from '@/contexts/loading.context';

export default function Layout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="body-wrapper">
            <LoadingContextProvider>
                <UserContextProvider>
                    <NavigationWrapper>
                        <Header />

                        <main className="main-content">
                            <div className="container">
                                {children}
                            </div>
                        </main>

                        <Footer />
                    </NavigationWrapper>
                </UserContextProvider>
            </LoadingContextProvider>
        </div>
    );
}
