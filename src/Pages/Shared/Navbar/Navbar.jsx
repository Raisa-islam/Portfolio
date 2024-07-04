import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import logoi from '../../../assets/P_logo.png'

const Navbar = () => {
 
  return (
   
    <div className="navbar bg-[#0B1930]">
      <div className="container mx-auto">
      <div className="flex-1">
      <img src={logoi} className="w-12 h-12 rounded-full border-2 p-1" alt="" />
    </div>
    <div className="flex-none">
      <ul className= 'hidden md:flex gap-4 text-[#CCD6F6]'>
        <li><a href=""></a>About</li>
        <li><a href=""></a>Skills</li>
        <li><a href=""></a>Projects</li>
        <li><a href=""></a>Education</li>
        <li><a href=""></a>Contact</li>
      </ul>
    </div>
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><a>Homepage</a></li>
        <li><a>Portfolio</a></li>
        <li><a>About</a></li>
      </ul>
    </div>
      </div>
    
   
  </div>     

  );
};

export default Navbar;
