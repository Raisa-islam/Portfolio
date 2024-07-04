import React from 'react';

const EducationCard = ({item}) => {
    const{instituteName,
        degreeName,
        yearStart,
        yearEnd,
        grade, subject}= item;
        console.log(item)
    return (
        <div className="card bg-[#12274b] ">

            <div className="card-body text-[#a1acc2]">
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