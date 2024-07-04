import React, { useEffect, useState } from 'react';
import EducationCard from '../../components/EducationCard';

const Education = () => {
    const [education, setEducation] = useState([]);
    useEffect(()=>{
        fetch('education.json')
        .then(res => res.json())
        .then(data => setEducation(data));

    }, [])
    console.log(education)
    return (
        <div>
            <h2 className="text-2xl font-bold text-white">Education</h2>

            <div className='mt-12 flex flex-col gap-4'>
                {education.map(project => <EducationCard key={project.id} item = {project}></EducationCard>)}

            </div>
           
        </div>
    );
};

export default Education;