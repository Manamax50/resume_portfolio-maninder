import React from 'react';
import type { Project } from '../types';
import './ProjectCard.css';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="project-card">
      <div className="project-card-image">
        <div className="project-card-overlay"></div>
        <div className="project-card-icon">
          <i className={`fas ${project.icon}`}></i>
        </div>
      </div>
      <div className="project-card-content">
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-desc">{project.tags[0] ? project.tags[0] : 'Project'}</p>
        <div className="project-card-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-card-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
