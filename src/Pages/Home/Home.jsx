import { Helmet } from 'react-helmet-async';
import Navbar from '../Shared/Navbar/Navbar';
import { FaFacebookF } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa6";
import GetInTouch from '../../layout/Contact/GetInTouch';
import Education from '../../layout/Education/Education';
import Projects from '../../layout/Projects/Projects';
import Skills from '../../layout/Skills/Skills';
import About from '../../layout/About/About';
import Footer from '../Shared/Footer/Footer'
import Banner from '../../layout/Banner/Banner';
import { Link } from 'react-scroll';

const Home = () => {
  return (
    <div className='bg-[#0B192F]'>
      <Helmet>
        <title>Raisa Islam | Web Developer</title>
      </Helmet>
      <Navbar />
      <div className='container mx-auto flex justify-between max-w-[90%]'>
        <div className='hidden md:flex w-6'>
          <div className=' flex flex-col gap-6 text-xl justify-center items-center fixed bottom-0 text-[#A8B2D1]'>

            <a href="https://github.com/Raisa-islam"><FiGithub className='cursor-pointer' /></a>
            <a href="https://www.linkedin.com/in/raisa-islam62/"><FaLinkedinIn className='cursor-pointer' /></a>
            <a href=""><FaFacebookF className='cursor-pointer'/></a>
            
            <div className='w-[2px] h-24 bg-[#A8B2D1]'>

            </div>
          </div>


        </div>
       
        <div className='md:px-4 w-[90%]'>
        <div>
          <Banner/>
        </div>
          <div id="section1" className="section py-20">
            <About/>
           
          </div>
          <div id="section2" className="section py-20">
           <Skills/>
          </div>
          <div id="section3" className="section py-20">
            <Projects/>
           
          </div>
          <div id="section4" className="section py-20">
           <Education/>
          </div>
          <div id="section5" className="section py-20">
            <GetInTouch/>
          </div>
          <div>
            <Footer/>
          </div>
        </div>
        <div className='w-6'>
        <div className=' flex flex-col gap-4 text-xl justify-center items-center fixed bottom-0'>
        <Link to="section5"><span className="vertical-text text-xl writing-mode-vertical-rl text-orientation-mixed text-[#A8B2D1] cursor-pointer">raisa.isl683@gmail.com</span></Link>
        <div className='w-[2px] h-24 bg-[#A8B2D1]'>

            </div>
          </div>
        
        </div>

      </div>

    </div>
  );
};

export default Home;
