import Navbar from '../Navbar/Navbar';

type LayoutProps = {
    children: [] | null;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Navbar />
            <main>{children}</main>
        </>
    );
};

export default Layout;
