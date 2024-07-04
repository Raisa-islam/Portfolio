
import { FiGithub } from "react-icons/fi";
import { LiaExternalLinkAltSolid } from "react-icons/lia";


const ProjectCard = ({item}) => {
      
    const {title, githubLink, liveLink, description, techUsed} = item;
    // console.log(item)
    
    return (
        <div className="card bg-[#112240] hover:bg-[#12274b]">
        <div className="card-body">
          <h2 className="card-title text-[#CCD6F6]">{title}</h2>
          <p className='text-[#959fba] text-md'>{description}</p>
          <div className="flex flex-row gap-3">
            {techUsed.map(x=><> <div className="text-[#8892AF]">{x}</div></>)}
          </div>
          <div className="card-actions justify-end text-[#A8B2D1] text-xl mt-2">
            <a href={githubLink}><FiGithub className=' cursor-pointer hover:text-[#64FFDA]'/></a>
           <a href={liveLink}><LiaExternalLinkAltSolid className=' cursor-pointer hover:text-[#64FFDA]'/></a> 
           
          </div>
        </div>
      </div>
    );
};

export default ProjectCard;