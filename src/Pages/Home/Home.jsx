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


const Home = () => {
  return (
    <div className='bg-[#0B192F]'>
      <Helmet>
        <title>Raisa Islam | Web Developer</title>
      </Helmet>
      <Navbar />
      <div className='container mx-auto flex justify-between'>
        <div className='hidden md:flex w-6'>
          <div className=' flex flex-col gap-6 text-xl justify-center items-center fixed bottom-0 text-[#A8B2D1]'>

            <FiGithub />
            <FaLinkedinIn />
            <FaFacebookF />
            <div className='w-[2px] h-24 bg-[#A8B2D1]'>

            </div>
          </div>


        </div>
        <div className='border w-full'>
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
        </div>
        <div className='w-6'>
        <div className=' flex flex-col gap-4 text-xl justify-center items-center fixed bottom-0'>
        <span className="vertical-text text-xl writing-mode-vertical-rl text-orientation-mixed text-[#A8B2D1]">email@example.com</span>
        <div className='w-[2px] h-24 bg-[#A8B2D1]'>

            </div>
          </div>
        
        </div>

      </div>

    </div>
  );
};

export default Home;
