import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const EducationCard = ({item}) => {
    const{instituteName,
        degreeName,
        yearStart,
        yearEnd,
        grade, subject}= item;
        console.log(item);
        useEffect(() => {
            AOS.init();
        }, []);
    return (
        <div className="card bg-[#12274b] " data-aos="flip-left">

            <div className="card-body text-[#a1acc2]" >
                <p className='text-white font-semibold text-lg'><span>{yearStart} </span>- {yearEnd}</p>
                <h2 className="card-title">{instituteName}</h2>
                <p>{degreeName}</p>
                <p>{subject}</p>
                <p>Grade: {grade}</p>

            </div>
        </div>
    );
};

export default EducationCard;