import React from 'react';
import { TemplateProps } from '../../types';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="w-full min-h-full bg-white text-gray-800 font-sans grid grid-cols-[30%_70%] shadow-lg print:shadow-none">
      {/* Sidebar */}
      <div className="bg-slate-900 text-white p-6 md:p-8 flex flex-col gap-8 print:bg-slate-900 print:text-white">
        <div id="section-personal" className="space-y-4 p-2 -m-2 rounded">
          <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-3xl font-bold mb-4 mx-auto">
            {personalInfo.fullName.charAt(0)}
          </div>
          <h1 className="text-2xl font-bold text-center leading-tight break-words">{personalInfo.fullName}</h1>
          <div className="flex flex-col gap-3 text-sm text-gray-300 mt-6">
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail size={14} className="shrink-0" /> <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone size={14} className="shrink-0" /> <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin size={14} className="shrink-0" /> <span className="break-words">{personalInfo.location}</span>
              </div>
            )}
             {personalInfo.website && (
              <div className="flex items-center gap-2">
                <Globe size={14} className="shrink-0" /> <span className="break-all">{personalInfo.website}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin size={14} className="shrink-0" /> <span className="break-all">{personalInfo.linkedin}</span>
              </div>
            )}
          </div>
        </div>

        <div id="section-skills" className="p-2 -m-2 rounded">
          <h3 className="text-lg font-semibold uppercase tracking-wider border-b border-gray-600 pb-2 mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="bg-slate-700 px-2 py-1 rounded text-xs break-words">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {education.length > 0 && (
          <div id="section-education" className="p-2 -m-2 rounded">
             <h3 className="text-lg font-semibold uppercase tracking-wider border-b border-gray-600 pb-2 mb-4">Education</h3>
             <div className="space-y-4">
               {education.map((edu, idx) => (
                 <div key={idx}>
                   <div className="font-bold text-sm break-words">{edu.title}</div>
                   <div className="text-xs text-gray-400 break-words">{edu.subtitle}</div>
                   <div className="text-xs text-gray-500">{edu.date}</div>
                 </div>
               ))}
             </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="p-8 md:p-10 flex flex-col gap-8">
        <div id="section-summary" className="p-2 -m-2 rounded">
          <h2 className="text-3xl font-bold text-slate-900 border-b-4 border-blue-500 pb-2 inline-block mb-4">Profile</h2>
          <p className="text-gray-600 leading-relaxed text-sm break-words">
            {personalInfo.summary}
          </p>
        </div>

        <div id="section-experience" className="p-2 -m-2 rounded">
           <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
             <span className="w-2 h-8 bg-blue-500 inline-block"></span> Experience
           </h2>
           <div className="space-y-6">
             {experience.map((exp, idx) => (
               <div key={idx} className="relative pl-4 border-l-2 border-gray-200">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-white"></div>
                  <div className="flex justify-between items-baseline mb-1 flex-wrap">
                    <h3 className="font-bold text-lg text-slate-800 break-words">{exp.title}</h3>
                    <span className="text-sm font-medium text-blue-600 whitespace-nowrap ml-2">{exp.date}</span>
                  </div>
                  <div className="text-md font-semibold text-gray-700 mb-2 break-words">{exp.subtitle} {exp.location ? `| ${exp.location}` : ''}</div>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-gray-600">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="break-words">{desc}</li>
                    ))}
                  </ul>
               </div>
             ))}
           </div>
        </div>

        {projects && projects.length > 0 && (
          <div id="section-projects" className="p-2 -m-2 rounded">
            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
             <span className="w-2 h-8 bg-blue-500 inline-block"></span> Projects
           </h2>
           <div className="grid grid-cols-1 gap-4">
             {projects.map((proj, idx) => (
               <div key={idx} className="bg-gray-50 p-4 rounded border-l-4 border-blue-400">
                 <h3 className="font-bold text-md break-words">{proj.title}</h3>
                 <p className="text-xs text-gray-500 mb-2 break-words">{proj.subtitle}</p>
                 <ul className="text-sm text-gray-600 list-disc ml-4">
                   {proj.description.map((d, i) => <li key={i} className="break-words">{d}</li>)}
                 </ul>
               </div>
             ))}
           </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;