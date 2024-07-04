import React, { useEffect } from 'react';
import htmlLogo from '../../assets/html-removebg-preview.png';
import jslogo from '../../assets/jslogo-removebg-preview.png';
import csslogo from '../../assets/logo-removebg-preview.png';
import reactlogo from '../../assets/reactlogo-removebg-preview.png';
import mongodblogo from '../../assets/mongodb-removebg-preview.png';
import firebaselogo from '../../assets/firebase-removebg-preview.png';
import AOS from 'aos';
import 'aos/dist/aos.css';


const Skills = () => {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <div data-aos="fade-up">
            <h2 className="text-2xl font-bold text-white">Skills</h2>

            <div className='flex justify-center items-center'>
                <div className='mt-12 grid grid-cols-2 md:grid-cols-3'>
                    <div>
                        <img src={htmlLogo} alt="" />
                    </div>
                    <div>
                        <img src={csslogo} alt="" />
                    </div>

                    <div>
                        <img src={jslogo} alt="" />
                    </div>

                    <div>
                        <img src={reactlogo} alt="" />
                    </div>

                    <div>
                        <img src={mongodblogo} alt="" />
                    </div>

                    <div className='mt-6'>
                        <img src={firebaselogo} alt="" />
                    </div>


                </div>
            </div>

        </div>
    );
};

export default Skills;