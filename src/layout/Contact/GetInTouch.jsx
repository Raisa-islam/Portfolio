
import { FaFacebookF } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa6";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2'

const GetInTouch = () => {
    useEffect(() => {
        AOS.init();
    }, []);
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();


        emailjs
            .sendForm('service_w9miwg4', 'template_q3nmnsl', form.current, {
                publicKey: 'DclJew29VpZ1hw-qB',
            })
            .then(
                () => {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Email Sent Successfully!",
                        showConfirmButton: false,
                        timer: 1500
                      });
                },
                (error) => {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Email Sent failed!",
                        showConfirmButton: false,
                        timer: 1500
                      });
                },
            );
    };
    return (
        <div className='flex flex-col md:flex-row gap-6 justify-between items-center' data-aos="fade-up">
            <div className='flex flex-col gap-4 md:w-1/2'>
                <h3 className='font-bold text-white text-2xl'>Get In Touch</h3>
                <p className='text-gray-400'>I am interested in working with new ideas and exploring potential collaborations. Let's discuss how we can create something amazing together!</p>
                <div className='flex flex-row gap-4 text-[#64FFDA] text-2xl'>
                    <a href="https://github.com/Raisa-islam"><FiGithub className='cursor-pointer' /></a>
                    <a href="https://www.linkedin.com/in/raisa-islam62/"><FaLinkedinIn className='cursor-pointer' /></a>
                    <a href=""><FaFacebookF className='cursor-pointer' /></a>

                </div>
            </div>
            <div className=' w-full md:w-1/2 flex flex-col gap-3 justify-center items-center'>
                <div className='w-full flex flex-col gap-3 h-32 rounded-xl'>
                    <form ref={form} onSubmit={sendEmail} className="text-white flex flex-col gap-4">
                        <div className="flex gap-3">
                        
                        <input type="text" name="user_name" className="bg-transparent border rounded-lg p-2 w-1/3" placeholder="Enter Name"/>
                       
                        <input type="email" name="user_email" className="bg-transparent border rounded-lg p-2 w-2/3" placeholder="Enter Email"/>
                        </div>
                       
                        <textarea name="message" className="bg-transparent border text-white rounded-lg p-2" placeholder="Write a Message"/>
                        <div className="flex justify-end">
                        <input type="submit" className='text-white btn bg-transparent border-[#64FFDA] hover:text-black' value="Send" />
                        </div>
                        
                    </form>
                   
                </div>
               
            </div>
        </div>
    );
};

export default GetInTouch;