import React from 'react';
import { TemplateProps } from '../../types';

const AcademicTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="w-full h-full bg-white text-black font-serif p-12 md:p-16 shadow-lg print:shadow-none min-h-[1100px] leading-relaxed">
      
      {/* Header */}
      <header id="section-personal" className="text-center mb-8 p-2 -m-2 rounded">
        <h1 className="text-2xl font-bold uppercase tracking-wider mb-2">{personalInfo.fullName}</h1>
        <div className="text-sm flex justify-center gap-4 flex-wrap">
          <span>{personalInfo.location}</span>
          <span>|</span>
          <span>{personalInfo.email}</span>
          <span>|</span>
          <span>{personalInfo.phone}</span>
          {personalInfo.linkedin && (
             <>
                <span>|</span>
                <span>{personalInfo.linkedin}</span>
             </>
          )}
        </div>
      </header>

      <div className="border-t border-black mb-6"></div>

      {/* Education First for Academic */}
      <section id="section-education" className="mb-6 p-2 -m-2 rounded">
        <h2 className="text-md font-bold uppercase mb-4">Education</h2>
        <div className="space-y-4">
          {education.map((edu, idx) => (
            <div key={idx} className="flex justify-between">
              <div>
                <div className="font-bold">{edu.subtitle}</div>
                <div>{edu.title}</div>
              </div>
              <div className="text-right">
                <div>{edu.location}</div>
                <div>{edu.date}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="section-experience" className="mb-6 p-2 -m-2 rounded">
        <h2 className="text-md font-bold uppercase mb-4">Professional Experience</h2>
        <div className="space-y-6">
          {experience.map((exp, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-1">
                <span className="font-bold">{exp.subtitle}</span>
                <span>{exp.location}</span>
              </div>
              <div className="flex justify-between mb-2 italic">
                <span>{exp.title}</span>
                <span>{exp.date}</span>
              </div>
              <ul className="list-disc ml-8 text-sm space-y-1">
                {exp.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
       <section id="section-skills" className="mb-6 p-2 -m-2 rounded">
        <h2 className="text-md font-bold uppercase mb-2">Skills</h2>
        <p className="text-sm text-justify">
          {skills.join(", ")}
        </p>
      </section>

      {/* Projects / Research */}
      {projects && projects.length > 0 && (
         <section id="section-projects" className="mb-6 p-2 -m-2 rounded">
            <h2 className="text-md font-bold uppercase mb-4">Projects & Research</h2>
            <div className="space-y-4">
              {projects.map((proj, idx) => (
                <div key={idx}>
                   <div className="flex justify-between">
                     <span className="font-bold">{proj.title}</span>
                     <span>{proj.date}</span>
                   </div>
                   <div className="italic text-sm mb-1">{proj.subtitle}</div>
                   <p className="text-sm">{proj.description[0]}</p>
                </div>
              ))}
            </div>
         </section>
      )}

      {/* Summary as "Profile" at bottom or top - Academic usually puts it later or omits. We'll put it at end if exists */}
      {personalInfo.summary && (
        <section id="section-summary" className="mt-8 pt-4 border-t border-gray-200 p-2 -m-2 rounded">
          <h2 className="text-md font-bold uppercase mb-2">Profile</h2>
          <p className="text-sm text-justify">{personalInfo.summary}</p>
        </section>
      )}
    </div>
  );
};

export default AcademicTemplate;