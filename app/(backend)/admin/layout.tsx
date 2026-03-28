import AdminLayoutClient from './AdminLayoutClient';
import {BackendAppProvider} from "./_components/BackendAppProvider";

export default function AdminRootLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    return (
        <BackendAppProvider>
            <AdminLayoutClient>{children}</AdminLayoutClient>
        </BackendAppProvider>
    );
}
