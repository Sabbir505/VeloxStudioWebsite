import React from 'react';
import { TemplateProps } from '../../types';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

const ProfessionalTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="w-full h-full bg-white text-gray-800 font-sans p-8 shadow-lg print:shadow-none min-h-[1100px]">
      {/* Header */}
      <header id="section-personal" className="bg-slate-800 text-white p-6 rounded-t-lg -mx-4 -mt-4 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 uppercase">{personalInfo.fullName}</h1>
            <p className="text-slate-300 text-sm max-w-lg">{personalInfo.summary}</p>
          </div>
          <div className="text-xs space-y-1 text-right text-slate-300">
             {personalInfo.email && <div className="flex items-center justify-end gap-2"><span className="break-all">{personalInfo.email}</span><Mail size={12}/></div>}
             {personalInfo.phone && <div className="flex items-center justify-end gap-2"><span>{personalInfo.phone}</span><Phone size={12}/></div>}
             {personalInfo.location && <div className="flex items-center justify-end gap-2"><span>{personalInfo.location}</span><MapPin size={12}/></div>}
             {personalInfo.linkedin && <div className="flex items-center justify-end gap-2"><span className="break-all">{personalInfo.linkedin}</span><Linkedin size={12}/></div>}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-[2fr_1fr] gap-8">
        {/* Main Column */}
        <div className="space-y-6">
           <section id="section-experience" className="p-2 -m-2 rounded">
             <h2 className="text-xl font-bold text-slate-800 border-b-2 border-slate-800 pb-1 mb-4 uppercase flex items-center gap-2">
                Experience
             </h2>
             <div className="space-y-6">
               {experience.map((exp, idx) => (
                 <div key={idx}>
                   <div className="flex justify-between items-baseline">
                     <h3 className="font-bold text-lg">{exp.title}</h3>
                     <span className="text-sm font-semibold text-slate-600">{exp.date}</span>
                   </div>
                   <div className="text-blue-700 font-medium mb-2">{exp.subtitle} | {exp.location}</div>
                   <ul className="list-disc ml-5 text-sm space-y-1 text-gray-700">
                     {exp.description.map((desc, i) => (
                       <li key={i}>{desc}</li>
                     ))}
                   </ul>
                 </div>
               ))}
             </div>
           </section>

           {projects && projects.length > 0 && (
             <section id="section-projects" className="p-2 -m-2 rounded">
                <h2 className="text-xl font-bold text-slate-800 border-b-2 border-slate-800 pb-1 mb-4 uppercase">
                  Projects
                </h2>
                <div className="space-y-4">
                   {projects.map((proj, idx) => (
                     <div key={idx}>
                       <div className="flex justify-between font-bold text-gray-800">
                          <span>{proj.title}</span>
                          <span className="text-xs text-gray-500">{proj.date}</span>
                       </div>
                       <div className="text-sm text-blue-700 mb-1">{proj.subtitle}</div>
                       <ul className="list-disc ml-5 text-sm text-gray-700">
                         {proj.description.map((d, i) => <li key={i}>{d}</li>)}
                       </ul>
                     </div>
                   ))}
                </div>
             </section>
           )}
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
           <section id="section-education" className="bg-slate-50 p-4 rounded-lg border border-slate-200">
             <h2 className="text-lg font-bold text-slate-800 border-b border-slate-300 pb-1 mb-3 uppercase">Education</h2>
             <div className="space-y-4">
               {education.map((edu, idx) => (
                 <div key={idx}>
                   <div className="font-bold text-sm text-slate-900">{edu.title}</div>
                   <div className="text-xs text-blue-700">{edu.subtitle}</div>
                   <div className="text-xs text-gray-500 mt-1">{edu.date}</div>
                 </div>
               ))}
             </div>
           </section>

           <section id="section-skills" className="bg-slate-50 p-4 rounded-lg border border-slate-200">
             <h2 className="text-lg font-bold text-slate-800 border-b border-slate-300 pb-1 mb-3 uppercase">Skills</h2>
             <div className="flex flex-wrap gap-2">
               {skills.map((skill, index) => (
                 <span key={index} className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-medium text-slate-700 shadow-sm">
                   {skill}
                 </span>
               ))}
             </div>
           </section>

           {personalInfo.website && (
              <section className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <h2 className="text-lg font-bold text-slate-800 border-b border-slate-300 pb-1 mb-3 uppercase">Links</h2>
                <a href={personalInfo.website} target="_blank" className="flex items-center gap-2 text-sm text-blue-700 hover:underline">
                   <Globe size={14}/> Portfolio
                </a>
              </section>
           )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;