"use client";
import { coreApi } from "@/api/client";
import { useAuthStore } from "@/store/authStore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, PlayCircle, Star, Users } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
gsap.registerPlugin(useGSAP);
export default function AcademyPublicPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { token, logout, userId } = useAuthStore();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    coreApi
      .get(`/tenants/slug/${slug}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.error || "Failed to load academy");
        setLoading(false);
      });
  }, [slug]);
  useGSAP(() => {
    if (!loading && data) {
      gsap.from(".reveal-up", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        clearProps: "all"
      });
      gsap.to(".float-blob", {
        y: -30,
        x: 20,
        rotation: 5,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.5
      });
    }
  }, { scope: containerRef, dependencies: [loading, data] });
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
      } else {
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
      <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  if (error || !data) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
      <h1 className="text-2xl font-display font-bold">404 - Academy Not Found</h1>
    </div>
  );
  const { tenant, courses } = data;
  const owner = tenant.owner;
  const displayCourses = courses && courses.length > 0 ? courses : [
    { id: 'demo1', title: 'The Complete Masterclass', description: 'Learn the fundamentals and advanced techniques in this comprehensive guide.', thumbnail_url: '' },
    { id: 'demo2', title: 'Advanced Strategies', description: 'Take your skills to the next level with industry-proven strategies.', thumbnail_url: '' },
    { id: 'demo3', title: 'Real-World Projects', description: 'Apply your knowledge by building 5 real-world projects from scratch.', thumbnail_url: '' }
  ];
  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--color-ada-bg)] text-[var(--color-ada-text)] ada-body antialiased overflow-hidden">
      <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 md:px-8 md:pt-6">
        <nav ref={navRef} className="max-w-[1440px] mx-auto bg-white rounded-full h-16 flex items-center justify-between px-6 shadow-sm transition-all duration-300">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              {tenant.logo_url && (
                <img src={tenant.logo_url} alt="Logo" className="h-8 w-auto object-contain" />
              )}
              <span className="ada-heading text-[22px] font-bold tracking-tight text-[#111]">{tenant.academy_name}</span>
            </div>
            <div className="hidden lg:flex items-center gap-6">
              <a href="#courses" className="text-[15px] font-medium text-[#111] hover:opacity-70 transition-opacity">Courses</a>
              <a href="#instructor" className="text-[15px] font-medium text-[#111] hover:opacity-70 transition-opacity">Instructor</a>
              <a href="#about" className="text-[15px] font-medium text-[#111] hover:opacity-70 transition-opacity">About</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {!token ? (
              <>
                <button onClick={() => router.push(`/${slug}/login`)} className="hidden sm:block text-[15px] font-medium text-[#111] hover:opacity-70 transition-opacity">
                  Log In
                </button>
                <button onClick={() => router.push(`/${slug}/signup`)} className="bg-[var(--color-ada-secondary)] text-[#111] text-[15px] font-medium px-6 py-2.5 rounded-full hover:brightness-95 active:scale-95 transition-all flex items-center gap-2">
                  Sign Up <ArrowRight size={16} />
                </button>
              </>
            ) : (
              <>
                <button onClick={() => router.push(`/${slug}/dashboard`)} className="flex items-center justify-center w-10 h-10 bg-[#f4f4f5] text-[#111] rounded-full hover:bg-gray-200 transition-colors">
                  <Users size={18} />
                </button>
                <button onClick={() => { logout(); router.push(`/${slug}`); }} className="text-[15px] font-medium text-[#111] hover:opacity-70 transition-opacity">
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
      <main className="relative z-10 pt-32 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto">
        <section className="reveal-up max-w-[1440px] mx-auto pt-32 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative w-full aspect-square max-w-[600px] mx-auto lg:mx-0">
            <div className="absolute inset-0 rounded-full bg-[var(--color-ada-green)] overflow-hidden border-2 border-[#111]">
              <div className="absolute inset-0 border-[var(--color-ada-text)] opacity-30">
                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#111]"></div>
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#111]"></div>
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-[var(--color-ada-blue)] fill-current">
                  <path d="M10,20 Q30,10 50,40 T90,30 L90,60 Q70,80 40,60 T10,70 Z" />
                  <path d="M0,80 Q20,60 40,90 L0,100 Z" />
                </svg>
              </div>
            </div>
            <div className="absolute top-[35%] left-[-10%] w-[140px] h-[90px] bg-[var(--color-ada-primary)] border-2 border-[#111] flex items-center justify-center transform -rotate-6 shadow-[4px_4px_0px_#111]">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#111] text-white rounded-full flex items-center justify-center text-[12px] font-bold">43</div>
              <div className="absolute top-0 left-0 right-0 h-1/2 border-b-2 border-[#111] bg-[var(--color-ada-red)]" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>
              <div className="w-3 h-3 bg-[#111] rounded-full z-10 mt-2"></div>
            </div>
            <div className="absolute bottom-[5%] left-[5%] w-[220px] bg-white border-2 border-[#111] p-4 shadow-[6px_6px_0px_#111]">
              <h4 className="text-[10px] font-bold text-[#111] uppercase tracking-wider mb-2">Transcript</h4>
              <p className="text-[12px] text-gray-500 mb-1">Student</p>
              <p className="text-[14px] font-medium text-[#111] leading-tight">
                ...could you help me with understanding this course module?
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start text-left">
            <h1 className="ada-heading text-[60px] md:text-[80px] lg:text-[96px] text-[#111] mb-6 tracking-tighter">
              {tenant.academy_name} <br/>
              to <span className="italic">accelerate</span> <br/>
              your learning
            </h1>
            <p className="ada-body text-[18px] md:text-[20px] text-[#111] max-w-lg mb-10 leading-relaxed">
              {tenant.description || "The platform that empowers students to learn efficiently, delivering high-quality education at scale with expert instructors."}
            </p>
            <button onClick={() => router.push(`/${slug}/signup`)} className="bg-[var(--color-ada-primary)] text-[#111] text-[18px] font-medium px-8 py-4 rounded-full hover:brightness-95 active:scale-95 transition-all flex items-center gap-3 group">
              Start Learning Free
              <div className="w-8 h-8 bg-[#111] text-white rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight size={16} />
              </div>
            </button>
          </div>
        </section>
        <section className="border-t-2 border-[#111] bg-white py-10 mb-24 overflow-hidden w-full relative -mx-6 md:-mx-12" style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)' }}>
          <div className="flex w-[200%] animate-marquee">
            {}
            <div className="flex w-1/2 items-center justify-around opacity-50 grayscale gap-12 px-12">
              {tenant.logo_url && <img src={tenant.logo_url} alt="Tenant Logo" className="h-8 w-auto object-contain" />}
              <span className="ada-heading font-bold text-[32px]">Grab</span>
              <span className="ada-heading font-bold text-[32px] italic">Canva</span>
              <span className="ada-heading font-bold text-[32px]">IPSY</span>
              <span className="ada-heading font-bold text-[24px]">mailchimp</span>
              <span className="ada-heading font-bold text-[32px]">Pinterest</span>
              <span className="ada-heading font-bold text-[28px] uppercase border-2 border-black px-4 py-1">weber</span>
            </div>
            {}
            <div className="flex w-1/2 items-center justify-around opacity-50 grayscale gap-12 px-12">
              {tenant.logo_url && <img src={tenant.logo_url} alt="Tenant Logo" className="h-8 w-auto object-contain" />}
              <span className="ada-heading font-bold text-[32px]">Grab</span>
              <span className="ada-heading font-bold text-[32px] italic">Canva</span>
              <span className="ada-heading font-bold text-[32px]">IPSY</span>
              <span className="ada-heading font-bold text-[24px]">mailchimp</span>
              <span className="ada-heading font-bold text-[32px]">Pinterest</span>
              <span className="ada-heading font-bold text-[28px] uppercase border-2 border-black px-4 py-1">weber</span>
            </div>
          </div>
        </section>
        {}
        {tenant.banner_url && (
          <section className="reveal-up mb-32 border-2 border-[#111] flex flex-col shadow-[8px_8px_0px_#111]">
            {}
            <div className="w-full flex flex-col lg:flex-row bg-[var(--color-ada-primary)] text-white">
              {}
              <div className="w-full lg:w-[35%] aspect-video lg:aspect-auto border-b-2 lg:border-b-0 lg:border-r-2 border-[#111] relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center blur-2xl scale-110 opacity-50" style={{ backgroundImage: `url(${tenant.banner_url})` }}></div>
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <img src={tenant.banner_url} className="w-full h-full object-cover border-2 border-[#111]" alt="Success" />
                </div>
              </div>
              {}
              <div className="w-full lg:w-[45%] p-8 lg:p-12 flex flex-col justify-between">
                <h2 className="ada-heading text-[32px] lg:text-[48px] leading-[1.05] mb-12">
                  deliver <span className="italic">extraordinary</span><br/>experiences on<br/>every channel
                </h2>
                <div className="flex items-end justify-between mt-auto gap-4">
                  <span className="text-[14px] lg:text-[16px] max-w-[200px] leading-tight">42% reduction in average learning time</span>
                  <button onClick={() => router.push(`/${slug}/signup`)} className="flex items-center gap-2 bg-[var(--color-ada-secondary)] text-[#111] rounded-full pl-4 pr-1 py-1 text-[13px] font-medium border-2 border-[#111] shadow-[2px_2px_0px_#111] hover:translate-y-[1px] hover:shadow-[0px_0px_0px_#111] transition-all whitespace-nowrap">
                    View case study
                    <div className="w-6 h-6 bg-[#111] text-white rounded-full flex items-center justify-center">
                      <ArrowRight size={14} />
                    </div>
                  </button>
                </div>
              </div>
              {}
              <div className="w-full lg:w-[20%] border-t-2 lg:border-t-0 lg:border-l-2 border-[#111] p-8 lg:p-10 flex flex-col justify-between">
                <div className="w-20 h-20 bg-white border-2 border-[#111] overflow-hidden mb-6 flex-shrink-0">
                  <img src={owner?.profile_image_url || tenant.logo_url} className="w-full h-full object-cover grayscale" alt={owner?.first_name || "Instructor"} />
                </div>
                <div className="flex flex-col gap-6 mt-auto">
                  <p className="text-[12px] lg:text-[13px] leading-relaxed">
                    "With {tenant.academy_name}, we know the automated resolution will continue to improve as the platform grows. The responses and the accuracy are phenomenal."
                  </p>
                  <div>
                    <div className="text-[12px] font-bold">{owner?.first_name || "Academy"} {owner?.last_name || "Admin"}</div>
                    <div className="text-[12px] opacity-80">Lead Instructor</div>
                  </div>
                </div>
              </div>
            </div>
            {}
            <div className="w-full flex flex-col lg:flex-row bg-[#fceea7] text-[#111] border-t-2 border-[#111]">
              {}
              <div className="w-full lg:w-[35%] aspect-video lg:aspect-auto border-b-2 lg:border-b-0 lg:border-r-2 border-[#111] relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center blur-2xl scale-110 opacity-50" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3')" }}></div>
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover border-2 border-[#111] grayscale" alt="Success" />
                </div>
              </div>
              {}
              <div className="w-full lg:w-[45%] p-8 lg:p-12 flex flex-col justify-between">
                <h2 className="ada-heading text-[32px] lg:text-[48px] leading-[1.05] mb-12">
                  focus on <span className="italic">growth</span>,<br/>not backlogs
                </h2>
                <div className="flex items-end justify-between mt-auto gap-4">
                  <span className="text-[14px] lg:text-[16px] max-w-[200px] leading-tight">60k human labor hours saved per month</span>
                  <button onClick={() => router.push(`/${slug}/signup`)} className="flex items-center gap-2 bg-[var(--color-ada-primary)] text-[#111] rounded-full pl-4 pr-1 py-1 text-[13px] font-medium border-2 border-[#111] shadow-[2px_2px_0px_#111] hover:translate-y-[1px] hover:shadow-[0px_0px_0px_#111] transition-all whitespace-nowrap">
                    View case study
                    <div className="w-6 h-6 bg-[#111] text-white rounded-full flex items-center justify-center">
                      <ArrowRight size={14} />
                    </div>
                  </button>
                </div>
              </div>
              {}
              <div className="w-full lg:w-[20%] border-t-2 lg:border-t-0 lg:border-l-2 border-[#111] p-8 lg:p-10 flex flex-col justify-between">
                <div className="w-20 h-20 bg-white border-2 border-[#111] overflow-hidden mb-6 flex-shrink-0">
                  <img src={tenant.logo_url || owner?.profile_image_url} className="w-full h-full object-cover grayscale" alt="Academy Logo" />
                </div>
                <div className="flex flex-col gap-6 mt-auto">
                  <p className="text-[12px] lg:text-[13px] leading-relaxed">
                    "Our curriculum provided a level of operational leverage that we couldn't have achieved with traditional methods, keeping our growth top-notch."
                  </p>
                  <div>
                    <div className="text-[12px] font-bold">{tenant.academy_name}</div>
                    <div className="text-[12px] opacity-80">Academy Team</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {}
        <section className="reveal-up mb-32 border-t-2 border-b-2 border-[#111] py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 divide-y md:divide-y-0 md:divide-x-2 divide-[#111]">
            <div className="px-4 md:px-8">
              <span className="text-[64px] ada-heading text-[#111] opacity-20 mb-2 block leading-none">01</span>
              <h3 className="ada-heading text-[32px] text-[#111] mb-4">Structured Learning</h3>
              <p className="text-[#111] leading-relaxed ada-body">Follow a proven path from beginner to expert with our meticulously crafted course modules and hands-on exercises.</p>
            </div>
            <div className="px-4 md:px-8 pt-12 md:pt-0">
              <span className="text-[64px] ada-heading text-[#111] opacity-20 mb-2 block leading-none">02</span>
              <h3 className="ada-heading text-[32px] text-[#111] mb-4">Elite Community</h3>
              <p className="text-[#111] leading-relaxed ada-body">Connect with ambitious peers, collaborate on projects, and get feedback directly from instructors and alumni.</p>
            </div>
            <div className="px-4 md:px-8 pt-12 md:pt-0">
              <span className="text-[64px] ada-heading text-[#111] opacity-20 mb-2 block leading-none">03</span>
              <h3 className="ada-heading text-[32px] text-[#111] mb-4">Industry Recognition</h3>
              <p className="text-[#111] leading-relaxed ada-body">Earn verifiable certificates upon completion that signal your expertise to top employers and clients worldwide.</p>
            </div>
          </div>
        </section>
        {}
        <section id="courses" className="reveal-up mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="ada-heading text-[56px] text-[#111] mb-4">Courses</h2>
              <p className="ada-body text-[20px] text-[#111]">Transformative content designed for rapid mastery.</p>
            </div>
            <button onClick={() => router.push(token ? `/${slug}/dashboard` : `/${slug}/signup`)} className="text-[14px] font-bold text-[#111] border-b-2 border-[#111] pb-1 hover:opacity-70 transition-colors inline-flex items-center gap-2">
              Browse all courses <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayCourses.map((course: any, idx: number) => (
              <div key={course.id || idx} onClick={() => router.push(`/${slug}/courses/${course.id}`)} className="group flex flex-col bg-white rounded-[20px] overflow-hidden border-2 border-[#111] shadow-[8px_8px_0px_#111] hover:translate-y-1 hover:shadow-[4px_4px_0px_#111] transition-all duration-300 cursor-pointer">
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                  {course.thumbnail_url ? (
                    <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <PlayCircle size={48} strokeWidth={1} />
                    </div>
                  )}
                  {}
                  <div className="absolute top-4 right-4 bg-[var(--color-ada-secondary)] px-3 py-1 rounded-full text-[13px] font-medium text-[#111] border-2 border-[#111] flex items-center gap-1">
                    <Star size={12} className="text-orange-400 fill-orange-400" /> Premium
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="ada-heading text-[32px] text-[#111] mb-3 leading-tight group-hover:text-blue-600 transition-colors">{course.title}</h3>
                  <p className="text-[#111] text-[16px] leading-relaxed line-clamp-3 mb-8 ada-body opacity-80 flex-grow">{course.description}</p>
                  <div className="flex items-center justify-between pt-6 border-t-2 border-[#111] mt-auto">
                    <span className="text-[16px] font-medium text-[#111]">Enroll Now</span>
                    <div className="w-10 h-10 rounded-full bg-transparent border-2 border-[#111] flex items-center justify-center group-hover:bg-[var(--color-ada-primary)] group-hover:text-white transition-colors">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        {}
        <section className="reveal-up text-center py-24 border-t-2 border-[#111]">
          <h2 className="ada-heading text-[56px] text-[#111] mb-8">Ready to level up?</h2>
          <button onClick={() => router.push(token ? `/${slug}/dashboard` : `/${slug}/signup`)} className="bg-[#111] text-white text-[18px] font-medium px-10 py-5 rounded-full hover:-translate-y-1 active:scale-95 transition-all inline-flex items-center gap-3">
            {token ? 'Go to Dashboard' : 'Create Free Account'} <ArrowRight size={20} />
          </button>
        </section>
      </main>
      {}
      <footer className="bg-white border-t-2 border-[#111] py-16 px-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between gap-12">
          <div className="flex flex-col gap-6 max-w-sm">
            <div className="flex items-center gap-3">
              {tenant.logo_url ? (
                <img src={tenant.logo_url} alt="Logo" className="h-8 w-auto grayscale opacity-80" />
              ) : (
                <span className="ada-heading text-[32px] text-[#111] tracking-tight">{tenant.academy_name}</span>
              )}
            </div>
            <p className="text-[#111] ada-body opacity-80 leading-relaxed">
              {tenant.description || `The premier destination for mastering your craft and accelerating your career.`}
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            <div className="flex flex-col gap-4">
              <h4 className="ada-heading text-[20px] text-[#111]">Contact Us</h4>
              {owner?.email && (
                <a href={`mailto:${owner.email}`} className="text-[#111] hover:text-[var(--color-ada-primary)] ada-body opacity-80">
                  {owner.email}
                </a>
              )}
              {owner?.phone && (
                <a href={`tel:${owner.phone}`} className="text-[#111] hover:text-[var(--color-ada-primary)] ada-body opacity-80">
                  {owner.phone}
                </a>
              )}
              {!owner?.email && !owner?.phone && (
                <span className="text-[#111] ada-body opacity-80">No contact info available</span>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="ada-heading text-[20px] text-[#111]">Legal</h4>
              <a href="#" className="text-[#111] hover:text-[var(--color-ada-primary)] ada-body opacity-80">Terms of Service</a>
              <a href="#" className="text-[#111] hover:text-[var(--color-ada-primary)] ada-body opacity-80">Privacy Policy</a>
            </div>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto mt-16 pt-8 border-t-2 border-[#111] flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[#111] ada-body opacity-60">© {new Date().getFullYear()} {tenant.academy_name}. All rights reserved.</span>
          <span className="text-[#111] ada-body opacity-60">Powered by <strong className="text-[#111]">Learnyst</strong></span>
        </div>
      </footer>
    </div>
  );
}
