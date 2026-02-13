import React, { useRef, useState } from 'react';
import { CVData, CVEntry } from '../types';
import { Plus, Trash2, Eye, GripVertical, Calendar, MapPin, Building2, GraduationCap } from 'lucide-react';

interface CVEditorProps {
  data: CVData;
  onChange: (data: CVData) => void;
  onFocusSection: (sectionId: string) => void;
}

interface SectionLabels {
  title: string;
  subtitle: string;
  date: string;
  location: string;
  description: string;
  sectionTitle: string;
  titlePlaceholder?: string;
  subtitlePlaceholder?: string;
  descPlaceholder?: string;
  icon?: React.ReactNode;
}

const CVEditor: React.FC<CVEditorProps> = ({ data, onChange, onFocusSection }) => {
  const [dragItem, setDragItem] = useState<number | null>(null);
  const [dragOverItem, setDragOverItem] = useState<number | null>(null);

  const handleChange = (section: keyof CVData, value: any) => {
    onChange({ ...data, [section]: value });
  };

  const handlePersonalInfoChange = (field: string, value: string) => {
    handleChange('personalInfo', { ...data.personalInfo, [field]: value });
  };

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...data.skills];
    newSkills[index] = value;
    handleChange('skills', newSkills);
  }

  const addSkill = () => handleChange('skills', [...data.skills, '']);
  const removeSkill = (index: number) => {
      const newSkills = [...data.skills];
      newSkills.splice(index, 1);
      handleChange('skills', newSkills);
  };

  const GenericListEditor = ({ 
    section, 
    labels 
  }: { 
    section: 'experience' | 'education' | 'projects', 
    labels: SectionLabels 
  }) => {
    const items = data[section];

    const handleItemChange = (index: number, field: keyof CVEntry, value: any) => {
      const newArray = [...items];
      newArray[index] = { ...newArray[index], [field]: value };
      handleChange(section, newArray);
    };

    const handleDescChange = (itemIndex: number, descIndex: number, value: string) => {
      const newArray = [...items];
      const newDesc = [...newArray[itemIndex].description];
      newDesc[descIndex] = value;
      newArray[itemIndex] = { ...newArray[itemIndex], description: newDesc };
      handleChange(section, newArray);
    };
    
    const addItem = () => {
        const emptyItem: CVEntry = { title: '', subtitle: '', date: '', location: '', description: [''] };
        handleChange(section, [...items, emptyItem]);
    };
  
    const removeItem = (index: number) => {
        const newArray = [...items];
        newArray.splice(index, 1);
        handleChange(section, newArray);
    };

    const addDesc = (itemIndex: number) => {
      const newArray = [...items];
      const newDesc = [...newArray[itemIndex].description, ''];
      newArray[itemIndex] = { ...newArray[itemIndex], description: newDesc };
      handleChange(section, newArray);
    };

    const removeDesc = (itemIndex: number, descIndex: number) => {
      const newArray = [...items];
      const newDesc = [...newArray[itemIndex].description];
      newDesc.splice(descIndex, 1);
      newArray[itemIndex] = { ...newArray[itemIndex], description: newDesc };
      handleChange(section, newArray);
    };

    return (
      <div className="space-y-4 pt-4">
        <div className="flex justify-between items-center px-4">
          <div className="flex items-center gap-2 text-slate-700">
             {labels.icon}
             <h3 className="text-sm font-bold uppercase tracking-wider">{labels.sectionTitle}</h3>
          </div>
          <div className="flex items-center gap-2">
            <button 
                onClick={() => onFocusSection(`section-${section}`)}
                className="text-slate-400 hover:text-blue-600 transition-colors p-1.5 rounded-lg hover:bg-blue-50"
                title="Highlight in Preview"
            >
                <Eye size={16} />
            </button>
            <button onClick={addItem} className="text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                <Plus size={14}/> Add
            </button>
          </div>
        </div>

        <div className="space-y-4 px-4">
            {items.map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:border-blue-300 transition-all group relative">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => removeItem(idx)} className="text-slate-400 hover:text-red-500 p-1 bg-white rounded-md shadow-sm border border-slate-100"><Trash2 size={16}/></button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Input label={labels.title} value={item.title} onChange={(v) => handleItemChange(idx, 'title', v)} placeholder={labels.titlePlaceholder} className="md:col-span-2 font-medium text-slate-800" />
                    <Input label={labels.subtitle} value={item.subtitle} onChange={(v) => handleItemChange(idx, 'subtitle', v)} placeholder={labels.subtitlePlaceholder} icon={<Building2 size={14} className="text-slate-400"/>} />
                    <Input label={labels.date} value={item.date} onChange={(v) => handleItemChange(idx, 'date', v)} placeholder="e.g. Jan 2023 - Present" icon={<Calendar size={14} className="text-slate-400"/>} />
                    <Input label={labels.location} value={item.location || ''} onChange={(v) => handleItemChange(idx, 'location', v)} placeholder="e.g. New York, NY" icon={<MapPin size={14} className="text-slate-400"/>} className="md:col-span-2" />
                </div>
                
                <div className="space-y-3 pt-3 border-t border-slate-100">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">{labels.description}</label>
                        <button onClick={() => addDesc(idx)} className="text-xs text-blue-500 hover:text-blue-700 font-medium flex items-center gap-1"><Plus size={12}/> Add Bullet</button>
                    </div>
                    {item.description.map((desc, dIdx) => (
                        <div key={dIdx} className="flex gap-2 items-start group/desc">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-200 mt-2.5 shrink-0" />
                            <textarea 
                                rows={1}
                                className="flex-1 p-2 bg-slate-50 border border-transparent rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none resize-none overflow-hidden" 
                                value={desc} 
                                onChange={(e) => {
                                    handleDescChange(idx, dIdx, e.target.value);
                                    e.target.style.height = 'auto';
                                    e.target.style.height = e.target.scrollHeight + 'px';
                                }} 
                                placeholder={labels.descPlaceholder || "Description point..."}
                            />
                            <button 
                            onClick={() => removeDesc(idx, dIdx)} 
                            className="text-slate-300 hover:text-red-400 opacity-0 group-hover/desc:opacity-100 transition-opacity p-1.5"
                            >
                            <Trash2 size={14}/>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            ))}
        </div>
      </div>
    );
  };

  const SkillsSection = () => (
      <div className="space-y-4 pt-4 px-4 pb-4">
         <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2 text-slate-700">
               <GripVertical size={16} className="text-transparent" /> {/* Spacer */}
               <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">Skills</h3>
            </div>
            <div className="flex gap-2">
                <button 
                onClick={() => onFocusSection('section-skills')}
                className="text-slate-400 hover:text-blue-600 transition-colors p-1.5 rounded-lg hover:bg-blue-50"
                title="Highlight in Preview"
                >
                <Eye size={16} />
                </button>
                <button onClick={addSkill} className="text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                    <Plus size={14}/> Add
                </button>
            </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
            <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, idx) => (
                    <div key={idx} className="relative group">
                        <input 
                            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm w-36 focus:w-48 transition-all focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none shadow-sm" 
                            value={skill} 
                            onChange={(e) => handleSkillChange(idx, e.target.value)}
                            placeholder="New Skill"
                        />
                        <button onClick={() => removeSkill(idx)} className="absolute -top-2 -right-2 bg-white text-slate-400 hover:text-red-500 rounded-full p-1 shadow-md border border-slate-100 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100"><Trash2 size={12}/></button>
                    </div>
                ))}
                 {data.skills.length === 0 && <p className="text-sm text-slate-400 italic">No skills added yet.</p>}
            </div>
        </div>
      </div>
  );

  // Drag and Drop Logic
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    setDragItem(position);
    e.dataTransfer.effectAllowed = "move";
    // Transparent ghost image if needed, or browser default
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    setDragOverItem(position);
    e.preventDefault();
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
      setDragItem(null);
      setDragOverItem(null);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (dragItem === null || dragOverItem === null || dragItem === dragOverItem) return;

      const newOrder = [...data.sectionOrder];
      const draggedItemContent = newOrder[dragItem];
      newOrder.splice(dragItem, 1);
      newOrder.splice(dragOverItem, 0, draggedItemContent);
      
      setDragItem(null);
      setDragOverItem(null);
      handleChange('sectionOrder', newOrder);
  };

  const renderSection = (sectionId: string) => {
      switch(sectionId) {
          case 'experience':
              return <GenericListEditor 
                section="experience"
                labels={{
                sectionTitle: "Work Experience",
                title: "Job Title",
                subtitle: "Company",
                date: "Date Range",
                location: "Location",
                description: "Key Achievements",
                titlePlaceholder: "e.g. Senior Software Engineer",
                subtitlePlaceholder: "e.g. Google",
                descPlaceholder: "e.g. Led a team of 5 developers to launch...",
                icon: <Building2 size={16} />
                }}
            />;
          case 'projects':
              return <GenericListEditor 
                section="projects"
                labels={{
                sectionTitle: "Projects",
                title: "Project Title",
                subtitle: "Tech Stack / Role",
                date: "Date",
                location: "Link / Location",
                description: "Project Details",
                titlePlaceholder: "e.g. E-commerce Platform",
                subtitlePlaceholder: "e.g. React, Node.js, MongoDB",
                descPlaceholder: "e.g. Built a scalable payment processing service...",
                icon: <GripVertical size={16} />
                }}
            />;
          case 'education':
              return <GenericListEditor 
                section="education"
                labels={{
                sectionTitle: "Education",
                title: "Degree",
                subtitle: "School / University",
                date: "Date",
                location: "Location",
                description: "Honors / Coursework",
                titlePlaceholder: "e.g. BS in Computer Science",
                subtitlePlaceholder: "e.g. Stanford University",
                descPlaceholder: "e.g. Graduated Summa Cum Laude",
                icon: <GraduationCap size={16} />
                }}
            />;
          case 'skills':
              return <SkillsSection />;
          default:
              return null;
      }
  };

  return (
    <div className="pb-10 space-y-2">
      
      {/* Personal Info - Always Fixed at Top */}
      <section className="space-y-4 pt-6 px-4 pb-4">
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">Personal Information</h3>
            <button 
                onClick={() => onFocusSection('section-personal')}
                className="text-slate-400 hover:text-blue-600 transition-colors p-1.5 rounded-lg hover:bg-blue-50"
                title="Highlight in Preview"
            >
                <Eye size={16} />
            </button>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 space-y-4">
            <div className="grid grid-cols-1 gap-4">
                <Input label="Full Name" value={data.personalInfo.fullName} onChange={(v) => handlePersonalInfoChange('fullName', v)} placeholder="John Doe" className="font-bold text-lg" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Email" value={data.personalInfo.email} onChange={(v) => handlePersonalInfoChange('email', v)} placeholder="john@example.com" />
                <Input label="Phone" value={data.personalInfo.phone} onChange={(v) => handlePersonalInfoChange('phone', v)} placeholder="(555) 123-4567" />
                <Input label="Location" value={data.personalInfo.location} onChange={(v) => handlePersonalInfoChange('location', v)} placeholder="City, Country" />
                <Input label="Website" value={data.personalInfo.website || ''} onChange={(v) => handlePersonalInfoChange('website', v)} placeholder="johndoe.com" />
                <Input label="LinkedIn" value={data.personalInfo.linkedin || ''} onChange={(v) => handlePersonalInfoChange('linkedin', v)} placeholder="linkedin.com/in/johndoe" className="md:col-span-2" />
            </div>
            <TextArea label="Professional Summary" value={data.personalInfo.summary} onChange={(v) => handlePersonalInfoChange('summary', v)} />
        </div>
      </section>

      {/* Draggable Sections */}
      <div className="space-y-4">
          {data.sectionOrder.map((sectionId, index) => (
             <div 
               key={sectionId}
               draggable
               onDragStart={(e) => handleDragStart(e, index)}
               onDragEnter={(e) => handleDragEnter(e, index)}
               onDragEnd={handleDragEnd}
               onDragOver={(e) => e.preventDefault()}
               onDrop={handleDrop}
               className={`transition-all duration-200 ${
                  dragItem === index ? 'opacity-50 scale-[0.98]' : 'opacity-100'
               } ${
                  dragOverItem === index ? 'border-t-4 border-blue-500 pt-4' : ''
               }`}
             >
                <div className="relative group">
                    {/* Drag Handle */}
                    <div className="absolute left-1 top-6 cursor-grab text-slate-300 hover:text-slate-500 z-10 p-2">
                        <GripVertical size={20} />
                    </div>
                    
                    {/* Content */}
                    <div className="pl-6 border-l-2 border-transparent hover:border-slate-200 transition-colors">
                        {renderSection(sectionId)}
                    </div>
                </div>
             </div>
          ))}
      </div>
      
    </div>
  );
};

// Reusable Modern Components
const Input = ({ label, value, onChange, placeholder, className = "", icon }: { label: string, value: string, onChange: (val: string) => void, placeholder?: string, className?: string, icon?: React.ReactNode }) => (
  <div className={className}>
    <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">{label}</label>
    <div className="relative">
        <input 
        type="text" 
        className={`w-full ${icon ? 'pl-9' : 'pl-3'} pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300 shadow-sm`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        />
        {icon && <div className="absolute left-3 top-2.5 pointer-events-none">{icon}</div>}
    </div>
  </div>
);

const TextArea = ({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) => (
  <div>
    <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">{label}</label>
    <textarea 
      rows={4}
      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300 shadow-sm leading-relaxed"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Briefly describe your professional background and key achievements..."
    />
  </div>
);

export default CVEditor;