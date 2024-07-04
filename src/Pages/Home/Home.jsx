import { Helmet } from 'react-helmet-async';
import Navbar from '../Shared/Navbar/Navbar';
import { FaFacebookF } from "react-icons/fa";;
import { FiGithub } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa6";


const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Raisa Islam | Web Developer</title>
      </Helmet>
      <Navbar />
      <div className='container mx-auto flex justify-between'>
        <div className=' w-6'>
          <div className=' flex flex-col gap-4 text-xl justify-center items-center fixed bottom-0'>

            <FiGithub />
            <FaLinkedinIn />
            <FaFacebookF />
            <div className='w-[2px] h-24 bg-black'>

            </div>
          </div>


        </div>
        <div className='border w-full'>
          <div id="section1" className="section py-20">
            <h2 className="text-2xl font-bold">About</h2>
            <p>Content for the About section.</p>
          </div>
          <div id="section2" className="section py-20">
            <h2 className="text-2xl font-bold">Skills</h2>
            <p>Content for the Skills section.</p>
          </div>
          <div id="section3" className="section py-20">
            <h2 className="text-2xl font-bold">Projects</h2>
            <p>Content for the Projects section.</p>
          </div>
          <div id="section4" className="section py-20">
            <h2 className="text-2xl font-bold">Education</h2>
            <p>Content for the Education section.</p>
          </div>
          <div id="section5" className="section py-20">
            <h2 className="text-2xl font-bold">Contact</h2>
            <p>Content for the Contact section.</p>
          </div>
        </div>
        <div className='w-6'>
        <div className=' flex flex-col gap-4 text-xl justify-center items-center fixed bottom-0'>
        <span className="vertical-text text-xl writing-mode-vertical-rl text-orientation-mixed">email@example.com</span>
        <div className='w-[2px] h-24 bg-black'>

            </div>
          </div>
        
        </div>

      </div>

    </div>
  );
};

export default Home;
