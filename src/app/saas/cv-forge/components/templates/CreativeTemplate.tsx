import React from 'react';
import { TemplateProps } from '../../types';

const CreativeTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="w-full h-full bg-white text-gray-800 font-sans grid grid-cols-[35%_65%] min-h-[1100px] shadow-lg print:shadow-none">
      
      {/* Sidebar */}
      <div className="bg-[#f0f4f8] p-8 border-r-4 border-rose-400 flex flex-col gap-10">
         <div id="section-personal" className="p-2 -m-2 rounded">
           <h1 className="font-display text-4xl font-bold text-slate-800 mb-2 leading-tight">{personalInfo.fullName}</h1>
           <div className="w-12 h-1 bg-rose-400 mb-6"></div>
           
           <div className="space-y-3 text-sm text-slate-600">
              {personalInfo.email && <div className="font-medium">{personalInfo.email}</div>}
              {personalInfo.phone && <div>{personalInfo.phone}</div>}
              {personalInfo.location && <div>{personalInfo.location}</div>}
              {personalInfo.website && <div className="text-rose-500 break-all">{personalInfo.website}</div>}
              {personalInfo.linkedin && <div className="text-rose-500 break-all">{personalInfo.linkedin}</div>}
           </div>
         </div>

         <div id="section-education" className="p-2 -m-2 rounded">
            <h3 className="font-display text-xl font-bold text-slate-800 mb-4">Education</h3>
            <div className="space-y-5">
              {education.map((edu, idx) => (
                <div key={idx}>
                  <div className="font-bold text-slate-900">{edu.title}</div>
                  <div className="text-sm text-slate-500">{edu.subtitle}</div>
                  <div className="text-xs text-rose-400 font-medium mt-1">{edu.date}</div>
                </div>
              ))}
            </div>
         </div>

         <div id="section-skills" className="p-2 -m-2 rounded">
            <h3 className="font-display text-xl font-bold text-slate-800 mb-4">Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="text-sm bg-white px-3 py-1 rounded-full shadow-sm text-slate-700 border border-rose-100">
                  {skill}
                </span>
              ))}
            </div>
         </div>
      </div>

      {/* Main Content */}
      <div className="p-10 pt-12">
        <section id="section-summary" className="mb-10 p-2 -m-2 rounded">
           <h2 className="font-display text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
             <span className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 text-sm">01</span>
             Profile
           </h2>
           <p className="text-slate-600 leading-relaxed">
             {personalInfo.summary}
           </p>
        </section>

        <section id="section-experience" className="mb-10 p-2 -m-2 rounded">
           <h2 className="font-display text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
             <span className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 text-sm">02</span>
             Experience
           </h2>
           <div className="space-y-8 border-l-2 border-rose-100 pl-6 ml-4">
             {experience.map((exp, idx) => (
               <div key={idx} className="relative">
                 <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-rose-400 border-4 border-white shadow-sm"></div>
                 <h3 className="font-bold text-lg text-slate-800">{exp.title}</h3>
                 <div className="text-rose-500 font-medium text-sm mb-1">{exp.subtitle}</div>
                 <div className="text-xs text-slate-400 mb-3 uppercase tracking-wider">{exp.date}</div>
                 <ul className="space-y-2">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="text-sm text-slate-600 leading-normal">
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
            <h2 className="font-display text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
             <span className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 text-sm">03</span>
             Projects
           </h2>
           <div className="grid gap-6">
             {projects.map((proj, idx) => (
               <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-rose-200 transition-colors">
                 <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-slate-800">{proj.title}</h4>
                    <span className="text-xs font-bold text-rose-400 bg-rose-50 px-2 py-0.5 rounded">{proj.subtitle}</span>
                 </div>
                 <p className="text-sm text-slate-600 line-clamp-2">{proj.description[0]}</p>
               </div>
             ))}
           </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CreativeTemplate;