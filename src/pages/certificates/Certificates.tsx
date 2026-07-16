import { motion } from 'framer-motion';
import { Download, Share2, Award, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const CERTIFICATES = [
  {
    id: 1,
    title: 'Outstanding Volunteer',
    event: 'City Park Cleanup 2026',
    hours: 12,
    date: 'Jul 15, 2026',
    image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&q=80&w=800&h=600'
  },
  {
    id: 2,
    title: 'Community Champion',
    event: 'Food Drive Weekend',
    hours: 24,
    date: 'Jun 20, 2026',
    image: 'https://images.unsplash.com/photo-1607386762299-8e104f7678bb?auto=format&fit=crop&q=80&w=800&h=600'
  },
  {
    id: 3,
    title: 'Green Guardian',
    event: 'Tree Plantation Drive',
    hours: 8,
    date: 'May 05, 2026',
    image: 'https://images.unsplash.com/photo-1557683304-673a23048d34?auto=format&fit=crop&q=80&w=800&h=600'
  }
];

export function Certificates() {
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleDownload = (cert: any) => {
    setDownloadingId(cert.id);
    setTimeout(() => {
      const content = `Certificate of Appreciation\n\n${cert.title}\nAwarded for: ${cert.event}\nHours Logged: ${cert.hours}\nDate: ${cert.date}\n\nThank you for your valuable contribution!`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${cert.title.replace(/\s+/g, '_')}_Certificate.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadingId(null);
    }, 1500);
  };

  const handleShare = (cert: any) => {
    const shareText = `Check out my ${cert.title} certificate for volunteering ${cert.hours} hours at the ${cert.event}!`;
    navigator.clipboard.writeText(shareText);
    setCopiedId(cert.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto py-4 font-sans pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-800 pb-8 pt-4">
        <div>
          <h1 className="text-3xl font-semibold mb-2 text-slate-100 tracking-tight">Your Certificates</h1>
          <p className="text-[15px] text-slate-400">View, download, and share your official volunteer achievements.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CERTIFICATES.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="h-full flex flex-col bg-slate-900 rounded-xl border border-slate-800 overflow-hidden hover:border-slate-700 transition-colors shadow-sm group">
              
              {/* Certificate Image Preview */}
              <div className="relative h-48 w-full overflow-hidden p-6 flex flex-col items-center justify-center text-center border-b border-slate-800">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${cert.image})` }}
                />
                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] transition-all duration-700 group-hover:bg-slate-900/40 group-hover:backdrop-blur-none" />
                
                {/* Flat borders replacing the old white/20 gradient borders */}
                <div className="absolute inset-3 border border-slate-800/80 rounded-lg pointer-events-none transition-colors duration-700 group-hover:border-slate-500/30" />
                
                <div className="relative z-10 flex flex-col items-center">
                  <Award size={32} strokeWidth={1.5} className="text-slate-300 mb-3 transition-colors duration-700 group-hover:text-yellow-400" />
                  <h3 className="text-xl font-semibold text-slate-100 mb-3 tracking-tight">
                    {cert.title}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950/80 border border-slate-800 text-slate-300 text-[10px] font-mono tracking-wider uppercase backdrop-blur-sm">
                    <CheckCircle2 size={12} className="text-emerald-400" />
                    Verified Auth
                  </div>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="mb-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Awarded For</p>
                  <h4 className="text-lg font-semibold text-slate-100 line-clamp-1">{cert.event}</h4>
                </div>
                
                <div className="flex justify-between items-center text-xs text-slate-400 mb-6 pb-5 border-b border-slate-800/50">
                  <span className="font-mono">{cert.hours} Hours Logged</span>
                  <span className="font-mono">Issued: {cert.date}</span>
                </div>
                
                <div className="flex gap-3 mt-auto">
                  <button 
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-sm active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
                    onClick={() => handleDownload(cert)}
                    disabled={downloadingId === cert.id}
                  >
                    {downloadingId === cert.id ? (
                      <div className="w-3.5 h-3.5 border-2 border-white/80 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Download size={14} />
                    )}
                    {downloadingId === cert.id ? 'Loading...' : 'Download PDF'}
                  </button>
                  <button 
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-sm active:scale-[0.98]" 
                    onClick={() => handleShare(cert)}
                  >
                    {copiedId === cert.id ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Share2 size={14} />} 
                    {copiedId === cert.id ? 'Copied!' : 'Share'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
