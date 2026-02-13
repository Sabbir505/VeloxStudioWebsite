import React, { useState } from 'react';
import { MarketReport, ProductIdea } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend, LabelList
} from 'recharts';
import { 
  Download, Share2, ArrowLeft, TrendingUp, Users, Target, 
  AlertTriangle, CheckCircle, Lightbulb, Loader2, Volume2, Activity, 
  CreditCard, Check, X, Minus, ListChecks, ThumbsUp, ThumbsDown, 
  Shield, DollarSign, Zap, Banknote
} from 'lucide-react';
import { generateAudioSummary } from '../services/geminiService';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface DashboardProps {
  report: MarketReport;
  idea: ProductIdea;
  onReset: () => void;
}

const COLORS = [
  '#3b82f6', // Blue 500
  '#10b981', // Emerald 500
  '#f59e0b', // Amber 500
  '#ef4444', // Red 500
  '#8b5cf6', // Violet 500
  '#ec4899', // Pink 500
  '#06b6d4', // Cyan 500
  '#6366f1', // Indigo 500
  '#84cc16', // Lime 500
  '#f97316'  // Orange 500
];

const Dashboard: React.FC<DashboardProps> = ({ report, idea, onReset }) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handlePlaySummary = async () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
      setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
      return;
    }

    setIsGeneratingAudio(true);
    try {
      const text = `${report.executiveSummary.summary}. The verdict is ${report.executiveSummary.verdict}.`;
      const audioBuffer = await generateAudioSummary(text);
      const blob = new Blob([audioBuffer], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      
      const audio = new Audio(url);
      audio.play();
      setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
    } catch (err) {
      console.error("Failed to generate audio", err);
      alert("Could not generate audio summary.");
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  const handleExportPDF = async () => {
    const input = document.getElementById('dashboard-content');
    if (!input) return;

    setIsExporting(true);

    try {
      // Small delay to ensure any layout shifts are settled
      await new Promise(resolve => setTimeout(resolve, 200));

      const canvas = await html2canvas(input, {
        scale: 2, // Higher resolution
        useCORS: true,
        backgroundColor: '#020617', // Match the background color
        logging: false,
        // Exclude elements that shouldn't be in the PDF (like the navbar if it were inside this div)
        ignoreElements: (element) => element.classList.contains('print:hidden')
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      // First page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Subsequent pages if content is long
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${idea.name.replace(/\s+/g, '_')}_Market_Analysis.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const getVerdictColor = (verdict: string) => {
    switch(verdict) {
      case 'GO': return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10 shadow-[0_0_20px_-5px_rgba(16,185,129,0.2)]';
      case 'NO-GO': return 'text-red-400 border-red-500/20 bg-red-500/10 shadow-[0_0_20px_-5px_rgba(239,68,68,0.2)]';
      default: return 'text-amber-400 border-amber-500/20 bg-amber-500/10 shadow-[0_0_20px_-5px_rgba(245,158,11,0.2)]';
    }
  };

  const renderCellValue = (val: string | undefined) => {
    if (!val) return <Minus className="w-4 h-4 text-slate-700 mx-auto" />;
    
    const v = val.toLowerCase();
    if (v === 'yes' || v === 'true' || v.includes('included') || v === 'check') {
      return <div className="flex justify-center"><div className="p-1 rounded-full bg-emerald-500/10"><Check className="w-4 h-4 text-emerald-400" /></div></div>;
    }
    if (v === 'no' || v === 'false' || v.includes('missing') || v === 'cross') {
      return <div className="flex justify-center"><div className="p-1 rounded-full bg-red-500/10"><X className="w-4 h-4 text-red-400" /></div></div>;
    }
    return <span className="text-sm text-slate-400 font-medium">{val}</span>;
  };

  const totalFeatures = report.featureComparison.length;
  const featureScores = report.competitors.map(comp => {
    let score = 0;
    report.featureComparison.forEach(fc => {
      const val = fc.comparison[comp.name]?.toLowerCase().trim() || '';
      if (val.includes('no limit') || val.includes('no cost') || val.includes('free')) {
        score++;
        return;
      }
      if (['no', 'none', 'missing', '-', 'x', '', 'n/a', 'false'].includes(val)) return;
      if (val.startsWith('not ') || val.startsWith('no ')) return; 
      score++;
    });
    const percentage = totalFeatures > 0 ? Math.round((score / totalFeatures) * 100) : 0;
    return { name: comp.name, score, percentage, total: totalFeatures };
  });

  const sortedPainPoints = [...report.userSentiment.painPoints].sort((a, b) => b.score - a.score);

  // Reusable Card Component Style
  const cardClass = "bg-[#0f172a]/60 border border-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-8 hover:border-white/10 transition-colors duration-300 shadow-xl shadow-black/20";
  const headerClass = "flex items-center gap-3 text-xl font-bold text-white mb-6 tracking-tight";
  const iconBoxClass = "p-2 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/5 text-slate-200";

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 animate-fade-in print:p-0 print:max-w-none">
      {/* Header Navigation */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-10">
        <button 
          onClick={onReset}
          className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium px-4 py-2 rounded-full hover:bg-white/5 print:hidden"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Input
        </button>
        <div className="flex gap-3 print:hidden">
          <button className="p-2.5 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors border border-white/5">
            <Share2 className="w-5 h-5" />
          </button>
          <button 
            onClick={handleExportPDF}
            disabled={isExporting}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium transition-all shadow-lg shadow-blue-500/20 text-sm disabled:opacity-50 disabled:cursor-wait"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Generating PDF...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" /> Export PDF
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content ID for HTML2Canvas */}
      <div id="dashboard-content">

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 print:block print:mb-6">
          <div className={`lg:col-span-2 ${cardClass} relative overflow-hidden print:mb-6 print:break-inside-avoid`}>
             {/* Decorative bg element */}
             <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Target className="w-48 h-48 text-white" />
             </div>
             
             <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className={`px-5 py-2 rounded-full text-sm font-bold border backdrop-blur-md ${getVerdictColor(report.executiveSummary.verdict)}`}>
                    {report.executiveSummary.verdict}
                  </span>
                  <span className="text-slate-400 text-sm font-medium bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                    AI Confidence: <span className="text-white">{report.executiveSummary.confidenceScore}%</span>
                  </span>
                </div>
                
                <h2 className="text-4xl font-bold text-white mb-4 tracking-tight leading-tight">{idea.name}</h2>
                <p className="text-slate-300 leading-relaxed text-lg mb-8 max-w-2xl font-light">{report.executiveSummary.summary}</p>
                
                <div className="flex gap-3 print:hidden">
                  <button 
                    onClick={handlePlaySummary}
                    className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all"
                    disabled={isGeneratingAudio}
                  >
                     {isGeneratingAudio ? <Loader2 className="w-5 h-5 animate-spin"/> : <Volume2 className="w-5 h-5" />}
                     <span className="font-medium">{isPlaying ? "Playing..." : "Listen to Audio Summary"}</span>
                  </button>
                </div>
             </div>
          </div>

          {/* Revenue Drivers Card */}
          <div className={`${cardClass} flex flex-col h-full print:break-inside-avoid bg-gradient-to-b from-[#0f172a]/80 to-[#0f172a]/60`}>
             <h3 className={headerClass}>
                <div className={iconBoxClass}><Banknote className="w-5 h-5" /></div>
                Key Revenue Drivers
             </h3>
             <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar max-h-[300px] lg:max-h-none">
                {report.competitors.map((comp, idx) => (
                   <div key={idx} className="p-4 rounded-2xl bg-[#020617]/50 border border-white/5 hover:border-emerald-500/30 transition-all group">
                      <div className="flex justify-between items-center mb-2">
                         <span className="font-semibold text-white text-sm group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full shrink-0 shadow-[0_0_8px_rgba(255,255,255,0.5)]" style={{backgroundColor: COLORS[idx % COLORS.length]}}></span>
                            {comp.name}
                         </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed pl-4 border-l-2 border-slate-700 group-hover:border-emerald-500/50 transition-colors">
                         {comp.revenueDriver || "Primary revenue source not identified."}
                      </p>
                   </div>
                ))}
             </div>
          </div>
        </div>

        {/* Main Grid: Market Stats & Competitors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 print:block">
          
          {/* Market Overview */}
          <div className={`${cardClass} print:mb-6 print:break-inside-avoid`}>
            <h3 className={headerClass}>
              <div className={iconBoxClass}><TrendingUp className="w-5 h-5 text-blue-400" /></div>
              Market Overview
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-[#020617]/40 p-5 rounded-2xl border border-white/5 backdrop-blur-sm">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Total Addressable Market</p>
                <p className="text-2xl font-bold text-white tracking-tight">{report.marketOverview.totalAddressableMarket}</p>
              </div>
              <div className="bg-[#020617]/40 p-5 rounded-2xl border border-white/5 backdrop-blur-sm">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Growth Trend</p>
                <div className="flex items-center gap-2">
                   <p className="text-2xl font-bold text-white tracking-tight">{report.marketOverview.growthTrend}</p>
                   {report.marketOverview.growthTrend === 'Growing' && <TrendingUp className="w-5 h-5 text-emerald-400" />}
                   {report.marketOverview.growthTrend === 'Stable' && <Minus className="w-5 h-5 text-amber-400" />}
                   {report.marketOverview.growthTrend === 'Declining' && <TrendingUp className="w-5 h-5 text-red-400 transform rotate-180" />}
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Key Market Trends</p>
              <div className="space-y-3">
                {report.marketOverview.keyTrends.slice(0, 4).map((trend, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)] shrink-0" />
                    {trend.name}
                    <div className="flex-1 h-px bg-white/5 mx-2" />
                    <span className="text-xs text-slate-500 font-mono">{trend.impact}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Competitor Analysis Chart */}
          <div className={`${cardClass} print:mb-6 print:break-inside-avoid`}>
             <h3 className={headerClass}>
              <div className={iconBoxClass}><Users className="w-5 h-5 text-purple-400" /></div>
              Estimated Market Share
            </h3>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={report.competitors}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={6}
                    dataKey="marketShareEstimate"
                    stroke="none"
                  >
                    {report.competitors.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                    itemStyle={{ color: '#e2e8f0' }}
                  />
                  <Legend 
                    layout="vertical" 
                    verticalAlign="middle" 
                    align="right"
                    iconType="circle"
                    iconSize={8}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Deep Dive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 print:block">
          <div className={`${cardClass} print:mb-6 print:break-inside-avoid`}>
              <h3 className={headerClass}>
                <div className={iconBoxClass}><Activity className="w-5 h-5 text-blue-400" /></div>
                Trend Impact Analysis
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={report.marketOverview.keyTrends}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      width={140} 
                      tick={({ x, y, payload }) => (
                        <text x={x - 10} y={y} dy={4} textAnchor="end" fill="#94a3b8" fontSize={11} fontWeight={500}>
                          {payload.value.length > 20 ? `${payload.value.substring(0, 20)}...` : payload.value}
                        </text>
                      )}
                    />
                    <Tooltip 
                      cursor={{fill: '#334155', opacity: 0.2}}
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc' }}
                    />
                    <Bar dataKey="impact" radius={[0, 6, 6, 0]} barSize={20}>
                      {report.marketOverview.keyTrends.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="url(#colorGradient)" />
                      ))}
                    </Bar>
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
          </div>

          <div className={`${cardClass} print:mb-6 print:break-inside-avoid`}>
            <div className="mb-6 flex justify-between items-end">
               <h3 className={headerClass + " mb-0"}>
                 <div className={iconBoxClass}><Zap className="w-5 h-5 text-amber-400" /></div>
                 Feature Completeness
              </h3>
              <span className="text-xs text-slate-500 font-mono">Benchmark: {totalFeatures} Features</span>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={featureScores}
                  margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
                >
                   <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                   <XAxis 
                      dataKey="name" 
                      tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
                      interval={0}
                      axisLine={false}
                      tickLine={false}
                      dy={10}
                   />
                   <Tooltip
                      cursor={{fill: '#334155', opacity: 0.2}}
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc' }}
                   />
                   <Bar dataKey="percentage" radius={[6, 6, 0, 0]} barSize={40}>
                      {featureScores.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} fillOpacity={0.9} />
                      ))}
                      <LabelList 
                        dataKey="percentage" 
                        position="top" 
                        fill="#94a3b8" 
                        fontSize={11} 
                        formatter={(val: number) => `${val}%`}
                      />
                   </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Feature Matrix */}
        {report.featureComparison && report.featureComparison.length > 0 && (
          <div className={`${cardClass} p-0 overflow-hidden mb-8 print:break-inside-avoid`}>
            <div className="p-6 md:p-8 border-b border-white/5">
               <h3 className={headerClass + " mb-0"}>
                 <div className={iconBoxClass}><ListChecks className="w-5 h-5 text-emerald-400" /></div>
                 Competitive Matrix
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="p-5 bg-[#020617]/50 text-slate-400 font-semibold text-xs uppercase tracking-wider border-b border-white/5 whitespace-nowrap sticky left-0 z-10 backdrop-blur-md">Feature</th>
                    {report.competitors.map((comp, idx) => (
                      <th key={idx} className="p-5 bg-[#020617]/30 text-white font-bold text-sm border-b border-white/5 text-center min-w-[140px]">
                        <span className="border-b-2 border-transparent pb-1" style={{ borderColor: COLORS[idx % COLORS.length] }}>
                          {comp.name}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {report.featureComparison.map((row, idx) => (
                    <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="p-5 text-slate-300 text-sm font-medium border-r border-white/5 sticky left-0 bg-[#0f172a] backdrop-blur-md whitespace-nowrap z-10">
                        {row.feature}
                      </td>
                      {report.competitors.map((comp, cIdx) => (
                        <td key={cIdx} className="p-5 text-center min-w-[140px]">
                          {renderCellValue(row.comparison[comp.name])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Strengths & Weaknesses */}
        <div className="mb-8 print:break-before-page">
          <h3 className={headerClass}>
            <div className={iconBoxClass}><Shield className="w-5 h-5 text-indigo-400" /></div>
            Competitor Analysis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {report.competitors.map((comp, idx) => (
              <div key={idx} className={`${cardClass} flex flex-col print:break-inside-avoid`}>
                <div className="flex justify-between items-start mb-6 pb-4 border-b border-white/5">
                  <h4 className="font-bold text-lg text-white">{comp.name}</h4>
                  {comp.marketShareEstimate > 0 && (
                     <span className="text-[10px] font-bold tracking-widest text-slate-400 bg-white/5 px-2 py-1 rounded-md uppercase border border-white/5">
                       {comp.marketShareEstimate}% Share
                     </span>
                  )}
                </div>
                
                <div className="mb-6 flex-grow">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">
                    <ThumbsUp className="w-3 h-3" /> Strengths
                  </div>
                  <ul className="space-y-3">
                    {comp.strengths.slice(0, 4).map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300 font-light leading-snug">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500 shrink-0 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-widest mb-3">
                    <ThumbsDown className="w-3 h-3" /> Weaknesses
                  </div>
                  <ul className="space-y-3">
                    {comp.weaknesses.slice(0, 4).map((w, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300 font-light leading-snug">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-500 shrink-0 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Analysis */}
        <div className="mb-8 print:break-inside-avoid">
           <h3 className={headerClass}>
              <div className={iconBoxClass}><DollarSign className="w-5 h-5 text-emerald-400" /></div>
              Pricing Models
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {report.competitors.map((comp, idx) => (
                 <div key={idx} className={`${cardClass} flex flex-col print:break-inside-avoid bg-gradient-to-b from-[#0f172a]/60 to-[#0f172a]/40`}>
                    <div className="mb-5">
                       <h4 className="font-bold text-lg text-white mb-1">{comp.name}</h4>
                       <p className="text-sm text-slate-400">{comp.pricingModel}</p>
                    </div>
                    
                    <div className="flex-grow space-y-3">
                       {comp.pricingTiers && comp.pricingTiers.length > 0 ? (
                          comp.pricingTiers.map((tier, tIdx) => (
                             <div key={tIdx} className="bg-[#020617]/40 border border-white/5 rounded-xl p-4 hover:bg-[#020617]/60 transition-colors">
                                <div className="flex justify-between items-baseline mb-3">
                                   <span className="font-semibold text-white text-sm">{tier.name}</span>
                                   <span className="text-emerald-400 font-bold text-sm bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">{tier.price}</span>
                                </div>
                                <ul className="space-y-2">
                                   {tier.features.slice(0, 3).map((feature, fIdx) => (
                                      <li key={fIdx} className="text-xs text-slate-400 flex items-start gap-2">
                                         <Check className="w-3 h-3 text-slate-600 mt-0.5 shrink-0" />
                                         {feature}
                                      </li>
                                   ))}
                                </ul>
                             </div>
                          ))
                       ) : (
                          <div className="text-sm text-slate-500 italic p-4 text-center border border-dashed border-slate-700 rounded-xl">
                             No tier data available.
                          </div>
                       )}
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* Detailed Analysis Rows */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 print:block">
          
          {/* Pain Points */}
          <div className={`${cardClass} print:mb-6 print:break-inside-avoid`}>
            <h3 className={headerClass}>
              <div className={iconBoxClass}><AlertTriangle className="w-5 h-5 text-red-400" /></div>
              Critical Pain Points
            </h3>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={sortedPainPoints}
                  margin={{ top: 10, right: 30, left: 10, bottom: 5 }} 
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                  <XAxis type="number" hide domain={[0, 100]} />
                  <YAxis 
                    type="category" 
                    dataKey="pain" 
                    width={180}
                    tick={({ x, y, payload }) => (
                      <text x={x - 10} y={y} dy={4} textAnchor="end" fill="#94a3b8" fontSize={11} fontWeight={500}>
                        {payload.value.length > 25 ? `${payload.value.substring(0, 25)}...` : payload.value}
                      </text>
                    )}
                    interval={0}
                  />
                  <Tooltip 
                    cursor={{fill: '#334155', opacity: 0.2}}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc' }}
                  />
                  <Bar dataKey="score" radius={[0, 6, 6, 0]} barSize={24}>
                    {sortedPainPoints.map((entry, index) => {
                      let color = '#eab308';
                      if (entry.severity === 'High') color = '#ef4444'; 
                      if (entry.severity === 'Medium') color = '#f97316'; 
                      return <Cell key={`cell-${index}`} fill={color} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pricing Strategy */}
          <div className={`${cardClass} print:mb-6 print:break-inside-avoid`}>
            <h3 className={headerClass}>
              <div className={iconBoxClass}><CreditCard className="w-5 h-5 text-emerald-400" /></div>
              Strategic Pricing
            </h3>
            
            <div className="mb-8 p-6 bg-gradient-to-br from-[#020617] to-slate-900 rounded-2xl border border-emerald-500/20 shadow-lg relative overflow-hidden">
               <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 blur-2xl rounded-full"></div>
               <div className="relative z-10">
                   <div className="flex items-baseline gap-2 mb-2">
                     <span className="text-4xl font-bold text-white tracking-tight">{report.pricingStrategy.recommendedPricePoint}</span>
                     <span className="text-slate-400 font-medium">/ {report.pricingStrategy.model}</span>
                   </div>
                   <p className="text-sm text-slate-300 italic border-l-2 border-emerald-500 pl-4 py-1">"{report.pricingStrategy.rationale}"</p>
               </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Recommended Tiers</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {report.pricingStrategy.tiers && report.pricingStrategy.tiers.map((tier, i) => (
                  <div key={i} className="bg-[#020617]/50 border border-white/5 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-white">{tier.name}</span>
                      <span className="text-emerald-400 font-bold">{tier.price}</span>
                    </div>
                    <ul className="space-y-2">
                      {tier.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-slate-500 mt-1.5 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 print:block">
           <div className={`${cardClass} print:mb-6 print:break-inside-avoid`}>
              <h3 className={headerClass}>
                 <div className={iconBoxClass}><CheckCircle className="w-5 h-5 text-emerald-400" /></div>
                 Feature Wishlist
              </h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {report.userSentiment.desiredFeatures.map((feat, i) => (
                   <span key={i} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-sm border border-white/5 shadow-sm">
                      {feat}
                   </span>
                ))}
              </div>
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                 <span className="text-slate-400 text-sm font-medium">User Sentiment Score</span>
                 <div className="flex items-center gap-4">
                    <div className="h-2.5 w-40 bg-slate-800 rounded-full overflow-hidden">
                       <div 
                          className={`h-full rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] ${report.userSentiment.sentimentScore > 70 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' : 'bg-amber-500'}`} 
                          style={{ width: `${report.userSentiment.sentimentScore}%` }}
                       />
                    </div>
                    <span className="font-bold text-2xl text-white">{report.userSentiment.sentimentScore}</span>
                 </div>
              </div>
           </div>

           <div className={`${cardClass} print:break-inside-avoid`}>
              <h3 className={headerClass}>
                 <div className={iconBoxClass}><Lightbulb className="w-5 h-5 text-yellow-400" /></div>
                 Market Opportunities
              </h3>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed bg-yellow-500/5 p-4 rounded-xl border border-yellow-500/10">
                  {report.opportunities.differentiationStrategy}
              </p>
              <div className="space-y-3">
                 {report.opportunities.gaps.map((gap, i) => (
                    <div key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                       <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0 shadow-[0_0_8px_rgba(250,204,21,0.6)] group-hover:scale-125 transition-transform" />
                       <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{gap}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Sources Footer */}
        {report.sources && report.sources.length > 0 && (
          <div className="mt-12 pt-8 border-t border-white/5 text-center md:text-left">
            <p className="text-[10px] text-slate-500 mb-4 uppercase tracking-widest font-bold">Verified Sources</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {report.sources.map((source, i) => (
                <a 
                  key={i} 
                  href={source.uri} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs text-slate-400 hover:text-blue-400 hover:underline truncate max-w-[200px] transition-colors"
                >
                  {source.title}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;