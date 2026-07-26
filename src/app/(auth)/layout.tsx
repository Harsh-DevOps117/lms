'use client';
import { Play } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const frameRef = useRef(null);
  useGSAP(() => {
  });
  return (
    <div className="min-h-screen flex bg-white bg-graph-paper-light">
      {}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 border-r-2 border-black relative z-10 bg-white">
        <div className="max-w-md w-full space-y-8 bg-white border-2 border-black p-10">
          <div className="text-center">
            <h1 className="font-display text-[48px] leading-[0.9] text-black uppercase tracking-tighter">
              LEARNYST
            </h1>
            <p className="mt-4 font-ui text-[14px] font-medium text-gray-500 uppercase tracking-widest">
              High-performance infrastructure
            </p>
          </div>
          {children}
        </div>
      </div>
      {}
      <div ref={frameRef} className="hidden lg:flex w-1/2 bg-[#161616] items-center justify-center relative overflow-hidden">
        {}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            backgroundPosition: "center top",
          }}
        ></div>
        <div className="relative z-10 flex w-full max-w-[800px] gap-12 px-12">
          {}
          <div className="w-[45%] flex flex-col items-center justify-center relative">
             {}
             <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
                <path 
                  d="M 10,100 L -30,100 L -30,220 L 300,220 L 300,340 L 250,340" 
                  fill="none" 
                  stroke="#444" 
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <circle cx="10" cy="100" r="5" fill="#f5a623" />
                <circle cx="260" cy="340" r="5" fill="#f5a623" />
             </svg>
             <div className="flex flex-col gap-28 relative z-10 w-full">
               <div className="bg-black text-white h-[160px] rounded-2xl border border-gray-800 shadow-2xl flex items-center justify-center relative">
                 <h3 className="font-display text-5xl font-bold tracking-tight">TEACH</h3>
               </div>
               <div className="bg-black text-white h-[160px] rounded-2xl border border-gray-800 shadow-2xl flex items-center justify-center relative">
                 <h3 className="font-display text-5xl font-bold tracking-tight">SCALE</h3>
               </div>
             </div>
             {}
             <div className="absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 z-20 w-[90px] h-[90px] bg-[#1db954] rounded-full flex items-center justify-center border-[6px] border-[#161616]">
               <span className="text-black font-bold text-[12px] uppercase tracking-widest rotate-45">TO</span>
               <div className="absolute -left-2 top-1/2 w-4 h-4 bg-white rounded-full -translate-y-1/2"></div>
               <div className="absolute -right-2 top-1/2 w-4 h-4 bg-white rounded-full -translate-y-1/2"></div>
               <div className="absolute top-3 left-4 w-2 h-2 bg-black rounded-full"></div>
             </div>
          </div>
          {}
          <div className="w-[55%] flex flex-col gap-4 justify-center">
             <div className="bg-[#1f1f1f] border border-gray-800 rounded-3xl p-8 shadow-2xl">
               <div className="flex justify-between items-center mb-4">
                 <h4 className="text-white font-bold text-xl">Control the learning experience</h4>
                 <span className="text-gray-500 cursor-pointer hover:text-white">×</span>
               </div>
               <p className="text-[#a0a0a0] text-[15px] leading-relaxed mb-8">
                 Our products are built for creators. Own the learning experience in your academy, from video upload to course completion, with customizable student portals. Creators using Learnyst can focus on teaching knowing they've already got world-class infrastructure.
               </p>
               <button className="bg-[#1db954] text-black text-[11px] font-bold px-6 py-3 rounded-full uppercase tracking-widest hover:bg-[#1ed760] transition-colors">
                 SEE WHAT OTHERS HAVE BUILT
               </button>
             </div>
             <div className="bg-[#1a1a1a] border border-gray-800 rounded-full px-8 py-5 flex justify-between items-center cursor-pointer hover:bg-[#222] transition-colors shadow-lg">
               <h4 className="text-white font-bold text-[16px]">Ship faster for less</h4>
               <span className="text-gray-500 font-light text-2xl leading-none">+</span>
             </div>
             <div className="bg-[#1a1a1a] border border-gray-800 rounded-full px-8 py-5 flex justify-between items-center cursor-pointer hover:bg-[#222] transition-colors shadow-lg">
               <h4 className="text-white font-bold text-[16px]">Build for the future</h4>
               <span className="text-gray-500 font-light text-2xl leading-none">+</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
