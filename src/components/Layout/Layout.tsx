import Navbar from "../Navbar/Navbar";

const Layout: React.FC = ({ children }: any | null) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  )
}

export default Layout;