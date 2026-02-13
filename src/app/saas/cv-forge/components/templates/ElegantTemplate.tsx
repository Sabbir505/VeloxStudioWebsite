import React from 'react';
import { TemplateProps } from '../../types';

const ElegantTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="w-full h-full bg-[#fdfbf7] text-gray-800 font-display p-12 md:p-16 shadow-lg print:shadow-none min-h-[1100px] border-t-8 border-stone-800">
      
      {/* Header */}
      <header id="section-personal" className="text-center mb-12 p-2 -m-2 rounded">
        <h1 className="text-5xl font-bold text-stone-900 mb-4 tracking-tight">{personalInfo.fullName}</h1>
        <div className="flex justify-center items-center gap-4 text-sm font-sans uppercase tracking-widest text-stone-500">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.email && <span className="text-stone-300">•</span>}
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span className="text-stone-300">•</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
        </div>
        <div className="mt-8 mx-auto w-16 h-[1px] bg-stone-400"></div>
      </header>

      {/* Summary */}
      <section id="section-summary" className="mb-12 max-w-2xl mx-auto text-center p-2 -m-2 rounded">
        <p className="font-serif italic text-lg text-stone-600 leading-relaxed">
          "{personalInfo.summary}"
        </p>
      </section>

      {/* Experience */}
      <section id="section-experience" className="mb-12 p-2 -m-2 rounded">
        <h2 className="text-center text-xl uppercase tracking-widest border-b border-stone-200 pb-4 mb-8 text-stone-800">Experience</h2>
        <div className="space-y-10">
          {experience.map((exp, idx) => (
            <div key={idx} className="grid grid-cols-[1fr_3fr] gap-6">
              <div className="text-right font-sans pt-1">
                <div className="font-bold text-stone-900">{exp.subtitle}</div>
                <div className="text-xs text-stone-500 uppercase tracking-wider mt-1">{exp.date}</div>
                <div className="text-xs text-stone-400 mt-1">{exp.location}</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-800 mb-2 font-serif">{exp.title}</h3>
                <ul className="list-disc ml-5 space-y-2 text-sm text-stone-600 font-sans leading-relaxed">
                  {exp.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Skills */}
      <div className="grid grid-cols-2 gap-12 border-t border-stone-200 pt-10">
        <section id="section-education" className="p-2 -m-2 rounded">
           <h2 className="text-lg uppercase tracking-widest mb-6 text-stone-800">Education</h2>
           <div className="space-y-6">
             {education.map((edu, idx) => (
               <div key={idx}>
                 <div className="font-serif text-lg font-bold text-stone-900">{edu.subtitle}</div>
                 <div className="font-sans text-stone-600">{edu.title}</div>
                 <div className="font-sans text-xs text-stone-400 mt-1">{edu.date}</div>
               </div>
             ))}
           </div>
        </section>

        <section id="section-skills" className="p-2 -m-2 rounded">
           <h2 className="text-lg uppercase tracking-widest mb-6 text-stone-800">Expertise</h2>
           <div className="flex flex-wrap gap-x-6 gap-y-2 font-sans text-stone-600 text-sm">
             {skills.map((skill, index) => (
               <div key={index} className="flex items-center gap-2">
                 <span className="w-1.5 h-1.5 bg-stone-300 rounded-full"></span>
                 {skill}
               </div>
             ))}
           </div>
        </section>
      </div>
      
       {projects && projects.length > 0 && (
          <section id="section-projects" className="mt-12 pt-8 border-t border-stone-200 p-2 -m-2 rounded">
             <h2 className="text-center text-xl uppercase tracking-widest mb-8 text-stone-800">Selected Projects</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
                {projects.map((proj, idx) => (
                  <div key={idx} className="bg-stone-50 p-6">
                     <div className="font-serif font-bold text-lg text-stone-900 mb-1">{proj.title}</div>
                     <div className="text-xs uppercase tracking-wider text-stone-400 mb-3">{proj.subtitle}</div>
                     <p className="text-sm text-stone-600">{proj.description[0]}</p>
                  </div>
                ))}
             </div>
          </section>
       )}
    </div>
  );
};

export default ElegantTemplate;