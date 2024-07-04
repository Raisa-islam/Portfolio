import { FaFacebookF } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa6";
const Footer = () => {
    return (
      <footer className="footer footer-center text-base-content rounded p-10">
      <div className="flex text-xl  gap-6 text-[#64FFDA]">
      <a href="https://github.com/Raisa-islam"><FiGithub className='cursor-pointer' /></a>
            <a href="https://www.linkedin.com/in/raisa-islam62/"><FaLinkedinIn className='cursor-pointer' /></a>
            <a href=""><FaFacebookF className='cursor-pointer'/></a>
      </div>
      
      <aside>
        <a href="https://github.com/Raisa-islam/Portfolio" className=" cursor-pointer"><p className="text-[#64FFDA]">Designed & Built By Raisa Islam</p></a>
        <p className="text-[#3d8d7a]">Copyright © ${new Date().getFullYear()} - All right reserved by Raisa Islam</p>
      </aside>
    </footer>
    );
};

export default Footer;