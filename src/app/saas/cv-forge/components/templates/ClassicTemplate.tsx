import React from 'react';
import { TemplateProps } from '../../types';

const ClassicTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, sectionOrder } = data;

  const renderSection = (sectionId: string) => {
      switch(sectionId) {
          case 'experience':
              return (
                <section key="experience" id="section-experience" className="mb-8 p-2 -m-2 rounded">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-4 pb-1">Experience</h2>
                    <div className="space-y-6">
                    {experience.map((exp, idx) => (
                        <div key={idx}>
                        <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-bold text-lg">{exp.subtitle}</h3>
                            <span className="text-sm italic">{exp.date}</span>
                        </div>
                        <div className="flex justify-between items-baseline mb-2">
                            <span className="font-semibold italic text-gray-700">{exp.title}</span>
                            <span className="text-xs text-gray-500">{exp.location}</span>
                        </div>
                        <ul className="list-disc ml-5 text-sm space-y-1 leading-snug">
                            {exp.description.map((desc, i) => (
                            <li key={i}>{desc}</li>
                            ))}
                        </ul>
                        </div>
                    ))}
                    </div>
                </section>
              );
          case 'education':
              return (
                <section key="education" id="section-education" className="mb-8 p-2 -m-2 rounded">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-4 pb-1">Education</h2>
                    <div className="space-y-4">
                        {education.map((edu, idx) => (
                        <div key={idx}>
                            <div className="font-bold">{edu.subtitle}</div>
                            <div className="italic text-sm">{edu.title}</div>
                            <div className="text-sm text-gray-600">{edu.date}</div>
                        </div>
                        ))}
                    </div>
                </section>
              );
          case 'skills':
              return (
                <section key="skills" id="section-skills" className="mb-8 p-2 -m-2 rounded">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-4 pb-1">Skills</h2>
                    <div className="text-sm leading-relaxed">
                        {skills.join(" • ")}
                    </div>
                </section>
              );
           case 'projects':
               return projects && projects.length > 0 ? (
                <section key="projects" id="section-projects" className="mb-8 p-2 -m-2 rounded">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-4 pb-1">Projects</h2>
                    <div className="space-y-4">
                    {projects.map((proj, idx) => (
                        <div key={idx}>
                        <div className="flex justify-between">
                            <span className="font-bold text-sm">{proj.title}</span>
                            {proj.date && <span className="text-xs italic">{proj.date}</span>}
                        </div>
                        <div className="text-xs italic mb-1">{proj.subtitle}</div>
                        <ul className="list-disc ml-5 text-xs">
                            {proj.description.map((d, i) => <li key={i}>{d}</li>)}
                        </ul>
                        </div>
                    ))}
                    </div>
                </section>
               ) : null;
           default:
               return null;
      }
  };

  return (
    <div className="w-full h-full bg-white text-gray-900 font-serif p-10 md:p-12 shadow-lg print:shadow-none min-h-[1100px]">
      {/* Header */}
      <header id="section-personal" className="border-b-2 border-gray-800 pb-6 mb-8 text-center p-2 -m-2 rounded">
        <h1 className="text-4xl font-bold mb-3 tracking-wide">{personalInfo.fullName}</h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm italic text-gray-700">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
        </div>
      </header>

      {/* Summary */}
      <section id="section-summary" className="mb-8 p-2 -m-2 rounded">
        <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1">Professional Summary</h2>
        <p className="text-justify leading-relaxed text-sm">
          {personalInfo.summary}
        </p>
      </section>

      {/* Dynamic Sections */}
      {sectionOrder.map(sectionId => renderSection(sectionId))}

    </div>
  );
};

export default ClassicTemplate;