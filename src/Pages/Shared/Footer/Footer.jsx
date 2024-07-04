const Footer = () => {
    return (
      <footer className="footer footer-center text-base-content rounded p-10">
      

      <aside>
        <a href="https://github.com/Raisa-islam/Portfolio" className=" cursor-pointer"><p className="text-[#64FFDA]">Designed & Built By Raisa Islam</p></a>
        <p className="text-[#3d8d7a]">Copyright © ${new Date().getFullYear()} - All right reserved by Raisa Islam</p>
      </aside>
    </footer>
    );
};

export default Footer;