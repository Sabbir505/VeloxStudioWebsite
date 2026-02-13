import React from 'react';
import { TemplateProps } from '../../types';
import { Terminal, Github, Globe, Mail } from 'lucide-react';

const TechTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="w-full min-h-full bg-[#1e1e1e] text-gray-300 font-sans p-0 shadow-lg print:shadow-none flex flex-col">
      
      {/* Top Bar (Terminal Window) */}
      <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-[#3c3c3c] shrink-0">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
         </div>
         <div className="flex-1 text-center font-mono text-xs text-gray-500">bash — 80x24</div>
      </div>

      <div className="p-8 md:p-10 flex-1 flex flex-col gap-8 font-mono">
        
        {/* Header */}
        <header id="section-personal" className="border-b border-gray-700 pb-6 p-2 -m-2 rounded hover:bg-[#252525] transition-colors">
          <div className="flex items-start gap-4 flex-wrap">
             <div className="mt-1 text-[#27c93f]">
               <Terminal size={32} />
             </div>
             <div className="flex-1">
               <h1 className="text-3xl font-bold text-white mb-2 break-words">
                 <span className="text-[#27c93f] mr-2">root@cv:~$</span>
                 {personalInfo.fullName}
               </h1>
               <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  {personalInfo.email && <span className="flex items-center gap-1 hover:text-white break-all"><Mail size={14}/> {personalInfo.email}</span>}
                  {personalInfo.website && <span className="flex items-center gap-1 hover:text-white break-all"><Globe size={14}/> {personalInfo.website}</span>}
                  {personalInfo.linkedin && <span className="flex items-center gap-1 hover:text-white break-all"><Github size={14}/> {personalInfo.linkedin}</span>}
                  <span>{personalInfo.location}</span>
               </div>
             </div>
          </div>
          <div className="mt-6 text-sm text-gray-400 pl-12 border-l-2 border-[#27c93f] ml-4 break-words whitespace-pre-wrap">
            <span className="text-purple-400">const</span> <span className="text-blue-400">summary</span> = <span className="text-[#ce9178]">"{personalInfo.summary}"</span>;
          </div>
        </header>

        {/* Skills as array */}
        <section id="section-skills" className="p-2 -m-2 rounded hover:bg-[#252525] transition-colors">
           <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
             <span className="text-blue-500">import</span> Skills <span className="text-blue-500">from</span> './expertise';
           </h2>
           <div className="bg-[#2d2d2d] p-4 rounded text-sm font-mono border border-gray-700 break-words">
              <span className="text-purple-400">export default</span> [
              <div className="flex flex-wrap gap-x-2 gap-y-1 pl-4 my-1">
                {skills.map((skill, idx) => (
                  <span key={idx} className="text-[#ce9178]">'{skill}'{idx < skills.length - 1 ? ',' : ''}</span>
                ))}
              </div>
              ];
           </div>
        </section>

        {/* Experience */}
        <section id="section-experience" className="p-2 -m-2 rounded hover:bg-[#252525] transition-colors">
           <h2 className="text-lg font-bold text-white mb-6">
             <span className="text-yellow-500">function</span> getExperience() &#123;
           </h2>
           <div className="space-y-6 pl-4 border-l border-gray-700 ml-2">
              {experience.map((exp, idx) => (
                <div key={idx} className="relative">
                   <div className="text-[#4ec9b0] font-bold text-lg mb-1 break-words">
                      {exp.title} <span className="text-white text-base font-normal">at</span> <span className="text-[#ce9178]">{exp.subtitle}</span>
                   </div>
                   <div className="text-xs text-gray-500 font-mono mb-2">// {exp.date} • {exp.location}</div>
                   <ul className="list-disc ml-4 space-y-1 text-sm text-gray-300">
                     {exp.description.map((d, i) => (
                       <li key={i} className="break-words">{d}</li>
                     ))}
                   </ul>
                </div>
              ))}
           </div>
           <div className="mt-4 text-white">&#125;</div>
        </section>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Education */}
            <section id="section-education" className="p-2 -m-2 rounded hover:bg-[#252525] transition-colors">
               <h2 className="text-lg font-bold text-white mb-4">
                 <span className="text-purple-400">class</span> Education &#123;
               </h2>
               <div className="pl-4 space-y-4">
                 {education.map((edu, idx) => (
                   <div key={idx}>
                      <div className="text-[#4ec9b0] font-bold break-words">{edu.title}</div>
                      <div className="text-sm text-gray-400 break-words">{edu.subtitle}</div>
                      <div className="text-xs text-gray-500">/* {edu.date} */</div>
                   </div>
                 ))}
               </div>
               <div className="mt-2 text-white">&#125;</div>
            </section>
            
            {/* Projects */}
            {projects.length > 0 && (
                <section id="section-projects" className="p-2 -m-2 rounded hover:bg-[#252525] transition-colors">
                    <h2 className="text-lg font-bold text-white mb-4">
                        <span className="text-blue-500">git</span> log --projects
                    </h2>
                     <div className="pl-4 space-y-4">
                        {projects.map((proj, idx) => (
                            <div key={idx}>
                                <div className="text-[#ce9178] font-bold flex items-center gap-2 flex-wrap">
                                   * {proj.title} <span className="text-xs text-gray-500 bg-[#333] px-1 rounded whitespace-nowrap">{proj.subtitle}</span>
                                </div>
                                <div className="text-xs text-gray-500 pl-3 border-l border-gray-700 ml-1 break-words">{proj.description[0]}</div>
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

export default TechTemplate;