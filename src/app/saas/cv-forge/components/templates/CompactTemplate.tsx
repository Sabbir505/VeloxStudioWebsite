import React from 'react';
import { TemplateProps } from '../../types';

const CompactTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="w-full h-full bg-white text-gray-900 font-sans p-6 shadow-lg print:shadow-none min-h-[1100px] text-sm">
      
      {/* Header */}
      <header id="section-personal" className="flex justify-between items-end border-b-2 border-black pb-2 mb-4 p-2 -m-2 rounded">
        <div>
           <h1 className="text-2xl font-black uppercase leading-none">{personalInfo.fullName}</h1>
           <div className="text-gray-600 mt-1 font-medium">{personalInfo.location}</div>
        </div>
        <div className="text-right text-xs font-medium space-y-0.5">
           <div>{personalInfo.email}</div>
           <div>{personalInfo.phone}</div>
           <div>{personalInfo.linkedin}</div>
           <div>{personalInfo.website}</div>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-4">
         
         {/* Main Content (2 cols) */}
         <div className="col-span-2 space-y-4">
            
            <section id="section-summary" className="p-1 -m-1 rounded">
               <h2 className="font-bold border-b border-gray-300 mb-1 uppercase text-xs tracking-wider">Profile</h2>
               <p className="text-xs text-justify leading-snug">{personalInfo.summary}</p>
            </section>

            <section id="section-experience" className="p-1 -m-1 rounded">
               <h2 className="font-bold border-b border-black mb-2 uppercase text-xs tracking-wider">Experience</h2>
               <div className="space-y-3">
                  {experience.map((exp, idx) => (
                    <div key={idx}>
                       <div className="flex justify-between items-baseline font-bold text-sm">
                          <span>{exp.title}</span>
                          <span className="text-xs font-normal">{exp.date}</span>
                       </div>
                       <div className="text-xs italic mb-1">{exp.subtitle}, {exp.location}</div>
                       <ul className="list-disc ml-4 space-y-0.5 text-xs text-gray-700">
                         {exp.description.map((desc, i) => (
                           <li key={i} className="pl-1">{desc}</li>
                         ))}
                       </ul>
                    </div>
                  ))}
               </div>
            </section>

            {projects && projects.length > 0 && (
              <section id="section-projects" className="p-1 -m-1 rounded">
                 <h2 className="font-bold border-b border-black mb-2 uppercase text-xs tracking-wider">Projects</h2>
                 <div className="space-y-2">
                    {projects.map((proj, idx) => (
                      <div key={idx}>
                         <div className="flex justify-between font-bold text-xs">
                           <span>{proj.title}</span>
                           <span className="font-normal text-gray-500">{proj.date}</span>
                         </div>
                         <div className="text-[10px] text-gray-500 mb-0.5">{proj.subtitle}</div>
                         <p className="text-xs text-gray-700">{proj.description[0]}</p>
                      </div>
                    ))}
                 </div>
              </section>
            )}
         </div>

         {/* Side Content (1 col) */}
         <div className="col-span-1 space-y-4">
            
            <section id="section-education" className="bg-gray-50 p-3 rounded p-1 -m-1">
               <h2 className="font-bold border-b border-gray-300 mb-2 uppercase text-xs tracking-wider">Education</h2>
               <div className="space-y-3">
                 {education.map((edu, idx) => (
                   <div key={idx}>
                     <div className="font-bold text-xs">{edu.subtitle}</div>
                     <div className="text-xs">{edu.title}</div>
                     <div className="text-[10px] text-gray-500 mt-0.5">{edu.date}</div>
                   </div>
                 ))}
               </div>
            </section>

            <section id="section-skills" className="p-1 -m-1 rounded">
               <h2 className="font-bold border-b border-gray-300 mb-2 uppercase text-xs tracking-wider">Skills</h2>
               <div className="space-y-1">
                  {skills.map((skill, index) => (
                    <div key={index} className="text-xs border-b border-dotted border-gray-200 pb-0.5">
                       {skill}
                    </div>
                  ))}
               </div>
            </section>
         </div>

      </div>
    </div>
  );
};

export default CompactTemplate;