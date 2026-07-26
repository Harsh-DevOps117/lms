"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import {
  ArrowDown,
  ArrowUp,
  AtSign,
  BarChart2,
  Battery,
  Building2,
  Check,
  Globe,
  GraduationCap,
  Heart,
  LineChart,
  Maximize,
  MessageCircle,
  Phone,
  Play,
  Radio,
  Settings,
  Square,
  Timer,
  User,
  Video,
  Volume2,
  Wifi,
  Menu,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function Home() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleBuy = (id: number, price: number) => {
    toast.success(`Access granted to system_${id}. Initializing protocol...`);
  };
  return (
    <div className="min-h-screen bg-[var(--color-canvas)] text-white overflow-x-hidden flex flex-col font-ui selection:bg-[var(--color-primary)] selection:text-black">
      {}
      <nav className="border-b border-[rgba(255,255,255,0.1)] flex justify-between items-center px-6 md:px-8 py-6 md:py-8 sticky top-0 bg-[var(--color-canvas)] z-50">
        <div className="font-display font-bold text-[24px] tracking-tighter">
          LEARNYST
        </div>
        <div className="hidden md:flex gap-8">
          {}
        </div>
        <div className="flex gap-4 items-center">
          <a
            href="#"
            className="text-[12px] font-mono font-bold uppercase tracking-widest text-[var(--color-ink-muted)] hover:text-white hidden sm:block"
            onClick={(e) => { e.preventDefault(); router.push('/signup'); }}
          >
            GET A DEMO
          </a>
          <Button
            variant="primary"
            className="px-6 py-2 rounded-full text-[12px] hidden sm:block"
            onClick={() => router.push('/login')}
          >
            SIGN UP/IN
          </Button>
          <button 
            className="md:hidden p-2 -mr-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      {}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[81px] bg-[var(--color-canvas)] z-40 flex flex-col p-6 gap-6 h-[calc(100vh-81px)] overflow-y-auto">
          <div className="flex flex-col gap-6 pt-4">
            {}
          </div>
          <div className="mt-auto pt-8 flex flex-col gap-4 pb-8">
            <Button
              variant="secondary"
              className="w-full justify-center py-4 text-[14px]"
              onClick={() => router.push('/signup')}
            >
              GET A DEMO
            </Button>
            <Button
              variant="primary"
              className="w-full justify-center py-4 bg-white text-black hover:bg-gray-200 text-[14px]"
              onClick={() => router.push('/login')}
            >
              SIGN UP/IN
            </Button>
          </div>
        </div>
      )}
      {}
      <main className="flex flex-col md:flex-row min-h-[85vh] border-b border-[rgba(255,255,255,0.1)] bg-[var(--color-canvas)]">
        {}
        <div className="w-full md:w-1/2 flex flex-col border-r border-[rgba(255,255,255,0.1)] relative">
          {}
          <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center border-b border-[rgba(255,255,255,0.1)]">
            <h1 className="font-display font-medium text-[48px] md:text-[60px] lg:text-[72px] leading-[1.05] uppercase mb-8 tracking-tighter text-left">
              THE INFRASTRUCTURE <br />
              FOR DIGITAL EDUCATION
            </h1>
            <p className="font-ui text-[18px] md:text-[20px] text-[var(--color-ink-muted)] mb-12 max-w-[500px] leading-relaxed text-left">
              Everything you need to build, scale, and monetize your online
              academy. A powerful multi-tenant LMS engineered for modern
              creators and enterprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="secondary"
                className="bg-white text-black hover:bg-gray-200 border-white px-8 h-[50px]"
                onClick={() => router.push('/signup')}
              >
                START TEACHING
              </Button>
              <Button variant="secondary" className="px-8 h-[50px]" onClick={() => router.push('/signup')}>
                BOOK A DEMO
              </Button>
            </div>
          </div>
          {}
          <div className="flex h-[240px]">
            {}
            <div className="w-[30%] lg:w-[250px] border-r border-[rgba(255,255,255,0.1)] flex items-center justify-center p-8">
              <div className="w-full aspect-square rounded-full bg-[#8c9398] relative flex items-start justify-center pt-2">
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black"></div>
              </div>
            </div>
            {}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 flex items-center px-6 border-b border-[rgba(255,255,255,0.1)] text-[18px] hover:bg-[rgba(255,255,255,0.03)] cursor-pointer">
                Learnyst Video
              </div>
              <div className="flex-1 flex items-center px-6 border-b border-[rgba(255,255,255,0.1)] text-[18px] hover:bg-[rgba(255,255,255,0.03)] cursor-pointer">
                Learnyst Player
              </div>
              <div className="flex-1 flex items-center px-6 text-[18px] hover:bg-[rgba(255,255,255,0.03)] cursor-pointer">
                Learnyst Data
              </div>
            </div>
            {}
            <div className="w-[80px] border-l border-[rgba(255,255,255,0.1)] flex flex-col bg-black">
              <div className="flex-1 flex items-center justify-center border-b border-[rgba(255,255,255,0.1)] text-white text-[24px]">
                👁
              </div>
              <div className="flex-1 flex items-center justify-center border-b border-[rgba(255,255,255,0.1)] text-white text-[20px] font-mono">
                ||||
              </div>
              <div className="flex-1 flex items-center justify-center text-white text-[24px]">
                🌐
              </div>
            </div>
          </div>
        </div>
        {}
        <div className="w-full md:w-1/2 bg-[#e6e9e3] flex items-center justify-center relative overflow-hidden min-h-[500px]">
          <img
            src="/images/i1.png"
            alt="Learnyst Platform"
            className="w-full h-full object-cover absolute inset-0"
          />
        </div>
      </main>
      {}
      <div className="border-b border-[rgba(255,255,255,0.1)] bg-[var(--color-surface-1)] py-6 overflow-hidden flex items-center">
        <div className="font-mono text-[14px] tracking-[0.3em] uppercase text-[var(--color-ink-muted)] whitespace-nowrap text-center w-full">
          HOST COURSES IN ANY CATEGORY
        </div>
      </div>
      {}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-b border-[rgba(255,255,255,0.1)] bg-[var(--color-surface-2)] text-black">
        {[
          "TECH & CODING",
          "BUSINESS",
          "DESIGN",
          "FITNESS",
          "LIFESTYLE",
          "SCHOOL SUBJECT",
        ].map((category, i) => (
          <div
            key={i}
            className="border-r border-[rgba(0,0,0,0.1)] py-12 md:py-16 flex items-center justify-center font-display font-black text-[20px] lg:text-[22px] xl:text-[26px] uppercase tracking-tighter opacity-90 text-center px-4"
          >
            {category}
          </div>
        ))}
      </div>
      {}
      <section className="bg-[#e6e9e3] text-black pt-24 pb-32 relative overflow-hidden font-ui border-b border-[rgba(0,0,0,0.1)]">
        <div className="max-w-[1300px] mx-auto px-8 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between mb-24 gap-12">
            <h2 className="text-[48px] lg:text-[56px] font-display font-bold leading-[1.0] tracking-tighter w-full lg:w-[45%]">
              One platform,
              <br />
              everything education
            </h2>
            <p className="text-[16px] lg:w-[50%] text-gray-800 leading-relaxed">
              Learnyst solves the hard problems creators face when building
              academies, whether it's a{" "}
              <span className="text-[#8e44ad] font-medium">live-cohort</span>{" "}
              platform,{" "}
              <span className="text-[#8e44ad] font-medium">community chat</span>
              , or an{" "}
              <span className="text-[#8e44ad] font-medium">
                on-demand course
              </span>{" "}
              catalog. Businesses use Learnyst to launch video features in days,{" "}
              <span className="text-[#8e44ad] font-medium">
                customize the player experience
              </span>
              , and monitor student completion, all while scaling seamlessly to
              global audiences.
            </p>
          </div>
          {}
          <div
            className="absolute top-[300px] left-[-50%] w-[200%] h-[1200px] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              backgroundPosition: "center top",
            }}
          ></div>
          {}
          <div className="relative w-full h-[750px] mt-12 hidden lg:block">
            {}
            <div className="absolute top-[0%] left-[0%] w-[260px] h-[520px] bg-white rounded-[36px] shadow-2xl border-[8px] border-[#e6e6e6] overflow-hidden flex flex-col z-20">
              <div className="h-8 w-full flex justify-center pt-2 relative z-10 bg-[#ff9900]">
                <div className="w-24 h-6 bg-black rounded-full"></div>
              </div>
              <div className="flex-1 bg-white flex flex-col items-center">
                <div className="w-full bg-[#ff9900] h-[260px] flex flex-col items-center pt-8">
                  <div className="font-bold text-[12px] mb-4">
                    le found{" "}
                    <span className="font-normal text-gray-800">
                      sound market
                    </span>
                  </div>
                  <div
                    className="w-[90%] h-[160px] bg-black shadow-lg rounded-md object-cover object-center"
                    style={{
                      backgroundImage: "url('/images/design.png')",
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <div className="w-[90%] text-left text-white text-[10px] font-mono mt-1">
                    00:00 / 00:59
                  </div>
                </div>
                <div className="w-full flex gap-2 justify-center mt-6 px-4">
                  <div className="w-[30%] h-12 bg-gray-200 border-2 border-orange-500 rounded relative">
                    <div className="absolute inset-0 flex items-center justify-center text-white text-lg drop-shadow-md">
                      <Play size={20} fill="currentColor" />
                    </div>
                  </div>
                  <div className="w-[30%] h-12 bg-gray-200 rounded"></div>
                  <div className="w-[30%] h-12 bg-gray-200 rounded"></div>
                </div>
                <div className="w-full px-4 text-left font-mono text-[10px] font-bold mt-4 mb-4">
                  Drum synthesizer demo video
                </div>
                <div className="w-[90%] h-10 bg-[#ea580c] rounded-full text-white flex items-center justify-center font-bold text-[12px] shadow-md">
                  Buy now
                </div>
              </div>
            </div>
            {}
            <div className="absolute top-[8%] left-[26%] w-[520px] h-[360px] bg-[#1e1e1e] rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.3)] border border-gray-700 overflow-hidden z-10 flex flex-col">
              <div className="h-8 bg-[#2d2d2d] flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>
              <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-[2px] bg-black">
                <div
                  className="bg-gray-800 bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/hero.png')" }}
                ></div>
                <div className="bg-[#a2c2a6] flex items-center justify-center text-white text-[24px]">
                  <User size={20} />
                </div>
                <div className="bg-[#785b8c] flex items-center justify-center text-white text-[24px]">
                  <User size={20} />
                </div>
                <div
                  className="bg-gray-500 bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/cloud.png')" }}
                ></div>
              </div>
              <div className="h-16 bg-[#555] flex items-center justify-center gap-4">
                <div className="px-5 py-1.5 rounded-full bg-[#333] text-white text-[12px] font-mono border border-[#222]">
                  <Settings size={14} />
                </div>
                <div className="px-6 py-1.5 rounded-full bg-[#333] text-white text-[12px] font-mono border border-[#222]">
                  Unmute
                </div>
                <div className="px-6 py-1.5 rounded-full bg-[#00c853] text-black text-[12px] font-mono font-bold shadow-md">
                  Share
                </div>
                <div className="px-6 py-1.5 rounded-full bg-[#333] text-white text-[12px] font-mono border border-[#222]">
                  Chat
                </div>
                <div className="w-8 h-8 rounded-full bg-[#ef5350] flex items-center justify-center text-white text-[12px] ml-4 shadow-md">
                  <Phone size={14} fill="currentColor" />
                </div>
              </div>
            </div>
            {}
            <div className="absolute top-[65%] left-[36%] w-[400px] bg-[#1f1f1f] text-white shadow-2xl overflow-hidden z-30 font-mono text-[10px] border border-gray-700">
              <div className="p-4 flex justify-between items-start">
                <div>
                  <div className="text-gray-400 mb-1 tracking-widest">
                    PLAYBACK FAILURES BY CCV
                  </div>
                  <div className="text-[36px] font-sans font-medium tracking-tight">
                    0.3%
                  </div>
                </div>
                <div className="w-4 h-4 border border-gray-500 rounded-full flex items-center justify-center text-[10px] text-gray-500 mt-1">
                  i
                </div>
              </div>
              <div className="h-[120px] flex items-end gap-[1px] px-4 pb-2 pt-2 relative border-b border-gray-700">
                {}
                {[
                  40, 45, 42, 50, 60, 55, 65, 80, 75, 70, 85, 90, 80, 70, 75,
                  80, 70, 60, 50, 45, 50, 60, 55, 60, 70, 65, 75, 80, 85, 90,
                  80, 75, 70,
                ].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-[#c2185b] rounded-t-[1px] opacity-90"
                    style={{ height: `${h}%` }}
                  ></div>
                ))}
                <div className="absolute bottom-1 left-4 right-4 flex justify-between text-[8px] text-gray-500 font-mono">
                  <span>30 minutes ago</span>
                  <span>15 minutes ago</span>
                  <span>a few seconds ago</span>
                </div>
              </div>
              <div className="bg-[#5a6268] text-white px-4 py-2 font-bold tracking-widest">
                CURRENT CONCURRENT VIEWERS (CCV)
              </div>
              <div className="bg-[#343a40] text-gray-300 px-4 py-2 font-bold tracking-widest">
                CURRENT AVERAGE BITRATE
              </div>
              <div className="absolute top-0 left-[-30px] flex flex-col gap-[1px]">
                <div className="w-6 h-6 bg-[#ff61a6] text-black flex items-center justify-center text-[12px]">
                  <ArrowUp size={12} />
                </div>
                <div className="w-6 h-6 bg-[#ff61a6] text-black flex items-center justify-center text-[12px]">
                  <ArrowDown size={12} />
                </div>
              </div>
            </div>
            {}
            <div className="absolute top-[82%] left-[3%] w-[420px] bg-[#222] text-white shadow-2xl overflow-hidden z-40 border border-gray-700">
              <div className="flex items-center gap-4 p-4 border-b border-gray-700">
                <span className="text-[14px]">
                  <Play size={12} fill="currentColor" />
                </span>
                <span className="text-[10px] font-mono tracking-widest text-gray-400">
                  {"<30 30>"}
                </span>
                <span className="text-[12px] font-mono">00:00 / 00:00</span>
                <div className="flex-1"></div>
                <span className="text-[14px]">
                  <Volume2 size={14} />
                </span>
                <span className="text-[12px] text-gray-400 font-bold">•••</span>
                <span className="text-[10px] border border-gray-500 px-1 rounded">
                  CC
                </span>
                <span className="text-[14px]">
                  <Square size={14} />
                </span>
                <span className="text-[14px]">
                  <Maximize size={14} />
                </span>
              </div>
              <div className="flex bg-[#e6e6e6] text-black p-3 gap-6 text-[10px] font-mono font-bold">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#00c853] shadow-[0_0_0_2px_white,0_0_0_3px_#ccc]"></div>{" "}
                  DEFAULT
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border border-gray-400 bg-transparent"></div>{" "}
                  MINIMAL
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border border-gray-400 bg-transparent"></div>{" "}
                  MICRO
                </div>
              </div>
            </div>
            {}
            <div className="absolute top-[10%] right-[3%] w-[270px] h-[550px] bg-[#1b4324] rounded-[36px] shadow-[0_30px_60px_rgba(0,0,0,0.3)] border-[8px] border-[#222] overflow-hidden flex flex-col z-20">
              <div className="h-8 w-full flex justify-between px-4 pt-3 relative z-10 text-[10px] text-white font-bold tracking-widest">
                <span>2:22</span>
                <div className="w-20 h-5 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-2"></div>
                <div className="flex gap-1">
                  <span>
                    <Wifi size={12} />
                  </span>
                  <span>
                    <Battery size={12} />
                  </span>
                </div>
              </div>
              <div className="flex-1 relative mt-2">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-80"
                  style={{
                    backgroundImage: "url('/images/code.png')",
                    mixBlendMode: "screen",
                  }}
                ></div>
                {}
                <div className="absolute top-[40%] left-[20%] w-2 h-2 bg-white rounded-full"></div>
                <div className="absolute top-[60%] right-[30%] w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div className="absolute top-[50%] left-[60%] w-2 h-2 bg-white rounded-full"></div>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white text-black font-mono text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 shadow-md">
                  <div className="w-2 h-2 rounded-full bg-red-600"></div> LIVE
                </div>
                <div className="absolute bottom-6 left-4 right-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black text-[16px] shadow-md">
                        <Globe size={18} fill="currentColor" />
                      </div>
                      <span className="text-white font-mono font-bold text-[12px] drop-shadow-md">
                        @WestLeague
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-white drop-shadow-md">
                      <span className="text-[16px]">
                        <Heart size={16} />
                      </span>
                      <span className="text-[8px] font-mono">1.8K</span>
                      <span className="text-[16px] mt-2">
                        <MessageCircle size={16} />
                      </span>
                      <span className="text-[8px] font-mono">3.9K</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-[10px]">||</span>
                    <div className="h-1 bg-white/30 rounded-full flex-1 mx-2">
                      <div className="w-[30%] h-full bg-white rounded-full"></div>
                    </div>
                    <div className="flex gap-2 text-[12px]">
                      <span>
                        <Volume2 size={14} />
                      </span>
                      <span className="border border-white/50 px-1 rounded text-[8px] flex items-center">
                        CC
                      </span>
                      <span>
                        <Maximize size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {}
            <div className="absolute top-[75%] left-[8%] flex items-center gap-2 font-mono text-[10px] text-gray-500 tracking-widest border border-[rgba(0,0,0,0.1)] bg-[#e6e9e3] px-3 py-2 z-10 shadow-sm">
              <span className="text-[16px]">
                <Video size={16} />
              </span>{" "}
              ON DEMAND VIDEO
            </div>
            <div className="absolute top-[68%] left-[30%] flex items-center gap-2 font-mono text-[10px] text-gray-500 tracking-widest z-10">
              REAL-TIME
              <br />
              VIDEO
            </div>
            <div className="absolute top-[73%] left-[30%] w-8 h-8 rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center text-gray-500 text-[16px] z-10 bg-[#e6e9e3] shadow-sm">
              <Timer size={18} />
            </div>
            <div className="absolute top-[96%] left-[13%] flex items-center gap-2 font-mono text-[10px] text-gray-500 tracking-widest border border-[rgba(0,0,0,0.1)] bg-[#e6e9e3] px-3 py-2 z-10 shadow-sm">
              <span className="text-[16px]">
                <Play size={12} fill="currentColor" />
              </span>{" "}
              LEARN PLAYER
            </div>
            <div className="absolute top-[96%] left-[64%] flex items-center gap-2 font-mono text-[10px] text-gray-500 tracking-widest border border-[rgba(0,0,0,0.1)] bg-[#e6e9e3] px-3 py-2 z-10 shadow-sm">
              <span className="text-[16px]">
                <LineChart size={16} />
              </span>{" "}
              LEARN DATA
            </div>
            <div className="absolute top-[82%] right-[17%] flex items-center gap-2 font-mono text-[10px] text-gray-500 tracking-widest border border-[rgba(0,0,0,0.1)] bg-[#e6e9e3] px-3 py-2 z-10 shadow-sm">
              <span className="text-[16px]">
                <Radio size={16} />
              </span>{" "}
              LIVE STREAMING
            </div>
          </div>
          {}
          <div className="lg:hidden flex flex-col gap-8 mt-12 bg-white p-8 rounded-2xl shadow-xl border border-gray-200 text-center">
            <h3 className="font-display text-[24px] font-bold">
              Interactive UI Preview
            </h3>
            <p className="text-gray-500">
              Please view on a desktop browser to experience the full
              interactive platform architecture collage.
            </p>
          </div>
        </div>
      </section>
      {}
      <section className="bg-[var(--color-canvas)] border-b border-[rgba(255,255,255,0.1)] relative">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 border-l border-r border-[rgba(255,255,255,0.1)]">
          <div className="p-8 md:p-16 lg:p-24 border-b lg:border-b-0 lg:border-r border-[rgba(255,255,255,0.1)] flex flex-col justify-center relative overflow-hidden">
            {}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white opacity-[0.02] blur-[100px] rounded-full pointer-events-none"></div>
            <div className="font-mono text-[12px] uppercase tracking-[0.2em] mb-6 text-gray-400 font-bold border border-gray-800 self-start px-3 py-1 rounded-full">
              Platform Features
            </div>
            <h2 className="font-display font-medium text-[48px] md:text-[64px] leading-[1.0] tracking-tight mb-8 text-white relative z-10">
              Focus on teaching,
              <br />
              we handle the rest.
            </h2>
            <p className="font-ui text-[20px] text-gray-400 mb-12 max-w-[500px] leading-relaxed relative z-10">
              Learnyst eliminates the technical complexity of running an online
              school. Build interactive courses, track student completion rates,
              and manage payouts without writing a single line of code.
            </p>
          </div>
          <div className="p-8 md:p-16 lg:p-24 grid grid-cols-1 gap-8 bg-[var(--color-surface-1)]">
            <ProductCard
              name="CREATOR DASHBOARDS"
              subtitle="Beautiful, intuitive analytics for instructors to track student progress, module completion, and daily revenue."
              price="Live"
              originalPrice="Data"
              icon={
                <span className="font-mono font-bold">
                  <BarChart2 size={24} />
                </span>
              }
              featured={false}
              onBuy={() => handleBuy(1, 0)}
            />
            <ProductCard
              name="STUDENT PORTALS"
              subtitle="Distraction-free learning environments optimized for engagement, featuring seamless video playback and resource downloads."
              price="100%"
              originalPrice="Focused"
              icon={
                <span className="font-mono font-bold">
                  <GraduationCap size={24} />
                </span>
              }
              onBuy={() => handleBuy(2, 0)}
            />
          </div>
        </div>
      </section>
      {}
      <section className="bg-[var(--color-canvas)] border-b border-[rgba(255,255,255,0.1)] py-24 md:py-32 relative">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="font-display font-medium text-[40px] md:text-[56px] leading-[1.05] tracking-tight mb-4">
              SIMPLE, TRANSPARENT PRICING
            </h2>
            <p className="font-ui text-[18px] text-[var(--color-ink-muted)] max-w-[600px] mx-auto">
              No hidden fees. No revenue share on your course sales. You keep
              100% of what you earn.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {}
            <div className="border border-[rgba(255,255,255,0.1)] bg-[var(--color-surface-1)] p-8 flex flex-col hover:border-white transition-colors">
              <h3 className="font-mono text-[14px] uppercase tracking-widest text-[var(--color-ink-muted)] mb-4">
                Starter
              </h3>
              <div className="font-display text-[48px] font-bold mb-4">
                $49
                <span className="text-[16px] text-gray-500 font-normal">
                  /mo
                </span>
              </div>
              <p className="font-ui text-[14px] text-gray-400 mb-8 flex-1">
                Everything you need to launch your first course and start
                earning.
              </p>
              <ul className="flex flex-col gap-4 mb-10 font-mono text-[12px] text-gray-300">
                <li className="flex items-center gap-3">
                  <span className="text-white text-[16px]">
                    <Check size={16} />
                  </span>{" "}
                  Unlimited Students
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white text-[16px]">
                    <Check size={16} />
                  </span>{" "}
                  1 Admin Account
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white text-[16px]">
                    <Check size={16} />
                  </span>{" "}
                  Standard Support
                </li>
                <li className="flex items-center gap-3 opacity-30">
                  <span className="text-transparent text-[16px]">
                    <Check size={16} />
                  </span>{" "}
                  Custom Domain
                </li>
              </ul>
              <Button variant="secondary" className="w-full h-[50px]" onClick={() => router.push('/signup')}>
                GET STARTED
              </Button>
            </div>
            {}
            <div className="border border-white bg-white text-black p-8 flex flex-col relative transform md:-translate-y-4 shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white font-mono text-[10px] uppercase tracking-widest px-4 py-1 font-bold whitespace-nowrap">
                Most Popular
              </div>
              <h3 className="font-mono text-[14px] uppercase tracking-widest text-gray-600 mb-4">
                Pro
              </h3>
              <div className="font-display text-[48px] font-bold mb-4">
                $99
                <span className="text-[16px] text-gray-500 font-normal">
                  /mo
                </span>
              </div>
              <p className="font-ui text-[14px] text-gray-600 mb-8 flex-1">
                For growing academies that need advanced analytics and team
                features.
              </p>
              <ul className="flex flex-col gap-4 mb-10 font-mono text-[12px] text-gray-800 font-bold">
                <li className="flex items-center gap-3">
                  <span>
                    <Check size={16} />
                  </span>{" "}
                  Unlimited Students
                </li>
                <li className="flex items-center gap-3">
                  <span>
                    <Check size={16} />
                  </span>{" "}
                  5 Admin Accounts
                </li>
                <li className="flex items-center gap-3">
                  <span>
                    <Check size={16} />
                  </span>{" "}
                  Priority Support
                </li>
                <li className="flex items-center gap-3">
                  <span>
                    <Check size={16} />
                  </span>{" "}
                  Custom Domain
                </li>
              </ul>
              <Button
                variant="primary"
                className="w-full bg-black text-white hover:bg-gray-800 h-[50px]"
                onClick={() => router.push('/signup')}
              >
                UPGRADE TO PRO
              </Button>
            </div>
            {}
            <div className="border border-[rgba(255,255,255,0.1)] bg-[var(--color-surface-1)] p-8 flex flex-col hover:border-white transition-colors">
              <h3 className="font-mono text-[14px] uppercase tracking-widest text-[var(--color-ink-muted)] mb-4">
                Enterprise
              </h3>
              <div className="font-display text-[40px] font-bold mb-4 mt-2 h-[58px] flex items-center">
                Custom
              </div>
              <p className="font-ui text-[14px] text-gray-400 mb-8 flex-1">
                Dedicated infrastructure and white-glove support for large scale
                platforms.
              </p>
              <ul className="flex flex-col gap-4 mb-10 font-mono text-[12px] text-gray-300">
                <li className="flex items-center gap-3">
                  <span className="text-white text-[16px]">
                    <Check size={16} />
                  </span>{" "}
                  Unlimited Everything
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white text-[16px]">
                    <Check size={16} />
                  </span>{" "}
                  Multi-Tenant API
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white text-[16px]">
                    <Check size={16} />
                  </span>{" "}
                  Dedicated Success Manager
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white text-[16px]">
                    <Check size={16} />
                  </span>{" "}
                  99.99% Uptime SLA
                </li>
              </ul>
              <Button variant="secondary" className="w-full h-[50px]" onClick={() => router.push('/signup')}>
                CONTACT SALES
              </Button>
            </div>
          </div>
        </div>
      </section>
      {}
      <section className="bg-white text-black border-b border-gray-200 py-24 md:py-32 relative">
        <div className="max-w-[800px] mx-auto px-8">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="font-display font-medium text-[40px] md:text-[56px] leading-[1.05] tracking-tight mb-4">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>
          <div className="flex flex-col gap-0 border-t border-gray-200">
            <div className="border-b border-gray-200 py-8 flex flex-col md:flex-row gap-4 md:gap-12 hover:bg-gray-50 transition-colors px-4 -mx-4 cursor-pointer rounded-xl">
              <h3 className="font-display font-bold text-[20px] md:w-1/3 leading-tight">
                Do you take a percentage of my sales?
              </h3>
              <p className="font-ui text-[16px] text-gray-600 leading-relaxed md:w-2/3">
                Absolutely not. You keep 100% of your revenue. We only charge a
                flat monthly fee for the platform infrastructure. Payment
                processing fees from providers like Stripe still apply directly
                to you.
              </p>
            </div>
            <div className="border-b border-gray-200 py-8 flex flex-col md:flex-row gap-4 md:gap-12 hover:bg-gray-50 transition-colors px-4 -mx-4 cursor-pointer rounded-xl">
              <h3 className="font-display font-bold text-[20px] md:w-1/3 leading-tight">
                Can I use my own domain name?
              </h3>
              <p className="font-ui text-[16px] text-gray-600 leading-relaxed md:w-2/3">
                Yes. Pro and Enterprise plans include custom domain support. You
                can easily connect your own domain (e.g., academy.yourbrand.com)
                and we will automatically provision an SSL certificate for you.
              </p>
            </div>
            <div className="border-b border-gray-200 py-8 flex flex-col md:flex-row gap-4 md:gap-12 hover:bg-gray-50 transition-colors px-4 -mx-4 cursor-pointer rounded-xl">
              <h3 className="font-display font-bold text-[20px] md:w-1/3 leading-tight">
                What kind of content can I host?
              </h3>
              <p className="font-ui text-[16px] text-gray-600 leading-relaxed md:w-2/3">
                You can host high-definition video, audio files, PDFs,
                downloadable resources, and interactive quizzes. Our video
                player supports adaptive bitrate streaming so your students get
                the best quality globally.
              </p>
            </div>
            <div className="border-b border-gray-200 py-8 flex flex-col md:flex-row gap-4 md:gap-12 hover:bg-gray-50 transition-colors px-4 -mx-4 cursor-pointer rounded-xl">
              <h3 className="font-display font-bold text-[20px] md:w-1/3 leading-tight">
                How do payouts work?
              </h3>
              <p className="font-ui text-[16px] text-gray-600 leading-relaxed md:w-2/3">
                Payouts are handled automatically through Stripe Connect. As
                soon as a student purchases your course, the funds are routed
                directly to your connected bank account. No waiting for
                end-of-month withdrawals.
              </p>
            </div>
          </div>
        </div>
      </section>
      {}
      <section className="bg-[var(--color-canvas)] text-white py-32 md:py-48 relative border-t border-[rgba(255,255,255,0.1)] overflow-hidden">
        {}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-white opacity-[0.02] blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-[1000px] mx-auto px-8 flex flex-col items-center text-center relative z-10">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-12">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span className="font-mono text-[12px] uppercase tracking-widest text-gray-300">Start scaling your academy</span>
          </div>
          <h2 className="font-display font-medium text-[56px] md:text-[96px] leading-[0.95] tracking-tighter mb-16">
            STOP PAYING PER USER.
          </h2>
          <button 
            className="group relative inline-flex items-center justify-center gap-4 bg-white text-black hover:bg-gray-200 transition-all duration-300 font-display font-bold text-[24px] md:text-[32px] px-10 py-5 rounded-[100px] mb-24 overflow-hidden"
            onClick={() => router.push('/signup')}
          >
cd             <span className="relative z-10 uppercase tracking-tight">Launch your academy</span>
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300">
               <ArrowUp size={24} className="rotate-45" />
            </div>
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full max-w-[800px] border-t border-[rgba(255,255,255,0.1)] pt-16">
            <div className="group flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 cursor-pointer hover:bg-white/5 p-8 rounded-2xl transition-colors border border-transparent hover:border-white/10">
              <div className="w-16 h-16 shrink-0 border border-white/20 rounded-2xl flex items-center justify-center font-mono font-bold text-[20px] bg-white/5 group-hover:bg-white group-hover:text-black transition-colors">
                <Building2 size={32} />
              </div>
              <div>
                <div className="font-display font-bold text-[24px] mb-2">Explore the Platform</div>
                <div className="font-mono text-[12px] text-gray-400 uppercase tracking-widest flex items-center justify-center md:justify-start gap-2 group-hover:text-white transition-colors">
                  View Features <ArrowUp size={12} className="rotate-45" />
                </div>
              </div>
            </div>
            <div className="group flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 cursor-pointer hover:bg-white/5 p-8 rounded-2xl transition-colors border border-transparent hover:border-white/10">
              <div className="w-16 h-16 shrink-0 border border-white/20 rounded-2xl flex items-center justify-center font-mono font-bold text-[20px] bg-white/5 group-hover:bg-white group-hover:text-black transition-colors">
                <AtSign size={32} />
              </div>
              <div>
                <div className="font-display font-bold text-[24px] mb-2">Speak to an Expert</div>
                <div className="font-mono text-[12px] text-gray-400 uppercase tracking-widest flex items-center justify-center md:justify-start gap-2 group-hover:text-white transition-colors">
                  Book a Demo <ArrowUp size={12} className="rotate-45" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {}
      <footer className="bg-[var(--color-canvas)] p-8 md:p-16 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 font-mono text-[12px] border-t border-[rgba(255,255,255,0.1)]">
        <div className="lg:col-span-2">
          <div className="font-display font-bold text-[32px] tracking-tighter mb-8">
            LEARNYST
          </div>
          <div className="text-[var(--color-ink-muted)] mb-4">
            UNITED STATES
            <br />
            120 Education Way, Suite 400
            <br />
            San Francisco, CA, 94105
            <br />
            <span className="underline">hello@learnyst.com</span>
          </div>
        </div>
        <div>
          <div className="text-white font-bold mb-4 uppercase">Product</div>
          <ul className="flex flex-col gap-3 text-[var(--color-ink-muted)]">
            <li className="hover:text-white cursor-pointer transition-colors">
              Course Builder
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Student Portals
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Creator Analytics
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Video Hosting
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Pricing
            </li>
          </ul>
        </div>
        <div>
          <div className="text-white font-bold mb-4 uppercase">Resources</div>
          <ul className="flex flex-col gap-3 text-[var(--color-ink-muted)]">
            <li className="hover:text-white cursor-pointer transition-colors">
              Help Center
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Creator Academy
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              API Documentation
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Community Forum
            </li>
          </ul>
        </div>
        <div>
          <div className="text-white font-bold mb-4 uppercase">Company</div>
          <ul className="flex flex-col gap-3 text-[var(--color-ink-muted)]">
            <li className="hover:text-white cursor-pointer transition-colors">
              About Us
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Careers
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Blog
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Terms of Service
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Privacy Policy
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
