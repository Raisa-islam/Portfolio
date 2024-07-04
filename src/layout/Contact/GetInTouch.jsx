
import { FaFacebookF } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa6";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const GetInTouch = () => {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <div className='flex flex-col md:flex-row gap-6 justify-between items-center data-aos="fade-up"'>
            <div className='flex flex-col gap-4 md:w-1/2'>
                <h3 className='font-bold text-white text-2xl'>Get In Touch</h3>
            <p className='text-gray-400'>I am interested in working with new ideas and exploring potential collaborations. Let's discuss how we can create something amazing together!</p>
            <div className='flex flex-row gap-4 text-[#64FFDA] text-2xl'>
            <a href="https://github.com/Raisa-islam"><FiGithub className='cursor-pointer' /></a>
            <a href="https://www.linkedin.com/in/raisa-islam62/"><FaLinkedinIn className='cursor-pointer' /></a>
            <a href=""><FaFacebookF className='cursor-pointer'/></a>
            
            </div>
            </div>
            <div className=' w-full md:w-1/2 flex flex-col gap-3 justify-center items-center'>
                <div className='w-full border h-32 rounded-xl'>
                    <input type='text' className='bg-transparent w-full h-full rounded-xl px-2 text-white' placeholder='Write a message'></input>

                </div>
                <div className='flex w-full justify-end'>
                    <button className='text-white btn bg-transparent border-[#64FFDA] hover:text-black'>Send</button>
                </div>
            </div>
        </div>
    );
};

export default GetInTouch;