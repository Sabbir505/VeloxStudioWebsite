import React from 'react';
import { TemplateProps } from '../../types';

const MinimalTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="w-full min-h-full bg-white text-neutral-800 font-sans p-10 md:p-14 shadow-lg print:shadow-none">
      
      {/* Header */}
      <div id="section-personal" className="mb-12 p-2 -m-2 rounded">
        <h1 className="text-5xl font-light tracking-tight text-neutral-900 mb-2 break-words">{personalInfo.fullName}</h1>
        <div className="text-sm text-neutral-500 font-medium flex flex-wrap gap-x-6 gap-y-2">
          {personalInfo.email && <span className="break-all">{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span className="break-all">{personalInfo.linkedin}</span>}
        </div>
      </div>

      <div className="grid grid-cols-[1fr_2fr] gap-10">
        
        {/* Left Column */}
        <div className="space-y-10">
          <section id="section-education" className="p-2 -m-2 rounded">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">Education</h3>
            <div className="space-y-6">
              {education.map((edu, idx) => (
                <div key={idx}>
                  <div className="font-medium text-neutral-800 break-words">{edu.subtitle}</div>
                  <div className="text-sm text-neutral-600 break-words">{edu.title}</div>
                  <div className="text-xs text-neutral-400 mt-1">{edu.date}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="section-skills" className="p-2 -m-2 rounded">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">Skills</h3>
            <ul className="space-y-2">
              {skills.map((skill, index) => (
                <li key={index} className="text-sm text-neutral-600 border-b border-neutral-100 pb-1 last:border-0 break-words">
                  {skill}
                </li>
              ))}
            </ul>
          </section>

          {personalInfo.website && (
            <section className="p-2 -m-2 rounded">
               <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Portfolio</h3>
               <a href={personalInfo.website} target="_blank" rel="noreferrer" className="text-sm text-blue-600 underline break-all">
                 {personalInfo.website.replace(/^https?:\/\//, '')}
               </a>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-10">
           <section id="section-summary" className="p-2 -m-2 rounded">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">About</h3>
            <p className="text-sm leading-relaxed text-neutral-600 break-words">
              {personalInfo.summary}
            </p>
          </section>

          <section id="section-experience" className="p-2 -m-2 rounded">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">Experience</h3>
            <div className="space-y-8">
              {experience.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline mb-1 flex-wrap">
                    <h4 className="font-semibold text-lg text-neutral-800 break-words">{exp.title}</h4>
                    <span className="text-xs font-mono text-neutral-400 whitespace-nowrap ml-2">{exp.date}</span>
                  </div>
                  <div className="text-sm font-medium text-neutral-500 mb-3 break-words">{exp.subtitle}</div>
                  <ul className="space-y-2">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="text-sm text-neutral-600 leading-normal relative pl-3 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-neutral-300 before:rounded-full break-words">
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

           {projects && projects.length > 0 && (
             <section id="section-projects" className="p-2 -m-2 rounded">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">Key Projects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {projects.map((proj, idx) => (
                     <div key={idx} className="bg-neutral-50 p-4 rounded-lg">
                       <h5 className="font-bold text-sm text-neutral-800 break-words">{proj.title}</h5>
                       <p className="text-xs text-neutral-500 mb-2 break-words">{proj.subtitle}</p>
                       <p className="text-xs text-neutral-600 line-clamp-3 break-words">{proj.description[0]}</p>
                     </div>
                   ))}
                </div>
             </section>
           )}
        </div>
      </div>
    </div>
  );
};

export default MinimalTemplate;