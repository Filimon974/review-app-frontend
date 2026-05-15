import Navbar from "../components/Navbar";
import MobileBottomNav from "../components/MobileBottomNav";



function MainLayout({ children }) {

  return (

    <div
      className="
      min-h-screen
      bg-[#f8f8f8]
      "
    >

      <Navbar />



      <main
        className="
        w-full
        px-4
        md:px-6
        lg:px-10
        xl:px-14
        pb-24
        "
        >
        {children}
      </main>



      <MobileBottomNav />

    </div>

  );

}

export default MainLayout;