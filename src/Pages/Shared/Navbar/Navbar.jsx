
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import logoi from '../../../assets/P_logo.png';
import { MdFileDownload } from "react-icons/md";
import { Link } from 'react-scroll';

const Navbar = () => {
  return (
    <div className="navbar bg-[#0B1930] fixed z-20">
      <div className="container mx-auto flex justify-between">
        <div className="flex-1">
          <img src={logoi} className="w-12 h-12 rounded-full border-2 p-1" alt="logo" />
        </div>
        <div className="flex-none hidden md:flex">
          <ul className='flex gap-4 text-[#CCD6F6]'>
            <li>
              <Link to="section1" className="cursor-pointer hover:text-[#64FFDA]" activeClass="active-link" smooth={true} duration={500}>
                About
              </Link>
            </li>
            <li>
              <Link to="section2" className="cursor-pointer hover:text-[#64FFDA]" activeClass="active-link" smooth={true} duration={500}>
                Skills
              </Link>
            </li>
            <li>
              <Link to="section3" className="cursor-pointer hover:text-[#64FFDA]" activeClass="active-link" smooth={true} duration={500}>
                Projects
              </Link>
            </li>
            <li>
              <Link to="section4" className="cursor-pointer hover:text-[#64FFDA]" activeClass="active-link" smooth={true} duration={500}>
                Education
              </Link>
            </li>
            <li>
              <Link to="section5" className="cursor-pointer hover:text-[#64FFDA]" activeClass="active-link" smooth={true} duration={500}>
                Contact
              </Link>
            </li>
            <li>
              <a className="border text-[#64FFDA] px-2 flex rounded-lg justify-center items-center cursor-pointer hover:bg-[#64FFDA] hover:text-[#0B1930]">
                <MdFileDownload /> Resume
              </a>
            </li>
          </ul>
        </div>
        <div className="md:hidden navbar-end w-5">
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label htmlFor="my-drawer" className="drawer-button cursor-pointer">
                <HiOutlineMenuAlt3 className="text-[#3e9497] text-2xl font-semibold" />
              </label>
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
              <ul className="flex flex-col gap-6 bg-[#112240] min-h-full w-80 p-4 text-lg font-semibold text-[#CCD6F6]">
                <li>
                  <Link to="section1" className="cursor-pointer hover:text-[#64FFDA]" activeClass="active-link" smooth={true} duration={500}>
                    About
                  </Link>
                </li>
                <li>
                  <Link to="section2" className="cursor-pointer hover:text-[#64FFDA]" activeClass="active-link" smooth={true} duration={500}>
                    Skills
                  </Link>
                </li>
                <li>
                  <Link to="section3" className="cursor-pointer hover:text-[#64FFDA]" activeClass="active-link" smooth={true} duration={500}>
                    Projects
                  </Link>
                </li>
                <li>
                  <Link to="section4" className="cursor-pointer hover:text-[#64FFDA]" activeClass="active-link" smooth={true} duration={500}>
                    Education
                  </Link>
                </li>
                <li>
                  <Link to="section5" className="cursor-pointer hover:text-[#64FFDA]" activeClass="active-link" smooth={true} duration={500}>
                    Contact
                  </Link>
                </li>
                <li>
                  <a className="border text-[#64FFDA] px-2 flex rounded-lg justify-center items-center cursor-pointer hover:bg-[#64FFDA] hover:text-[#0B1930]">
                    <MdFileDownload /> Resume
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
