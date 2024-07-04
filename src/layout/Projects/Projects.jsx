import { useEffect, useState } from "react";
import ProjectCard from "../../components/ProjectCard";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    useEffect(()=>{
        fetch('projects.json')
        .then(res => res.json())
        .then(data => setProjects(data));

    }, [])
    console.log(projects)
    return (
        <div>
             <h2 className="text-2xl font-bold text-white">Projects</h2>
            <div className="mt-12 flex items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map(project => <ProjectCard key={project.id} item = {project}></ProjectCard>)}
                </div>
            </div>
        </div>
    );
};

export default Projects;