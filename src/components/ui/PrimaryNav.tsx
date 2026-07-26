'use client';
import Link from 'next/link';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
export const PrimaryNav = () => {
  const { token, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname, searchParams]);
  const handleLogout = () => {
    logout();
    router.push('/');
  };
  useGSAP(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, { scope: navRef });
  return (
    <>
      <nav 
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 w-full bg-[var(--color-canvas)]/80 backdrop-blur-md border-b border-[var(--color-hairline-soft)]"
      >
        {}
        <div className="h-20 px-6 max-w-[1440px] mx-auto flex items-center justify-between">
          {}
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden flex items-center justify-center w-10 h-10 -ml-2 text-[var(--color-ink)]"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <Link href="/" className="group flex items-center">
              <div className="font-display text-[28px] uppercase tracking-tighter text-[var(--color-ink)] leading-none transition-transform group-hover:scale-[1.02]">
                LEARNYST
              </div>
            </Link>
          </div>
          {}
          <div className="hidden md:flex items-center gap-10 font-ui font-medium text-[15px] uppercase tracking-widest text-[var(--color-ink)]">
            <Link href="/" className="relative group">
              <span>Courses</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--color-ink)] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/" className="relative group">
              <span>Bootcamps</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--color-ink)] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/" className="relative group">
              <span>Business</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--color-ink)] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
          {}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:flex items-center border border-[var(--color-hairline)] rounded-full px-4 py-2 hover:border-[var(--color-ink)] transition-colors">
              <Search size={16} className="text-[var(--color-ink)] mr-2" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none font-ui text-[14px] text-[var(--color-ink)] w-32 placeholder:text-[var(--color-mute)]"
              />
            </div>
            <button className="hidden md:flex w-10 h-10 rounded-full hover:bg-[var(--color-soft-cloud)] items-center justify-center transition-colors">
              <ShoppingBag size={20} className="text-[var(--color-ink)]" />
            </button>
            <div className="flex items-center gap-3 border-l border-[var(--color-hairline)] pl-4 md:pl-6 ml-2 md:ml-0">
              {!token ? (
                <>
                  <button onClick={() => router.push('/login')} className="hidden md:block font-ui font-medium text-[14px] hover:text-[var(--color-mute)] transition-colors">
                    Log In
                  </button>
                  <Button variant="primary" onClick={() => router.push('/signup')} className="rounded-full px-6 py-2 text-[14px]">
                    Join Us
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="secondary" onClick={() => router.push(params?.slug ? `/${params.slug}/dashboard` : '/dashboard')} className="rounded-full px-6 py-2 text-[14px] border-[var(--color-ink)]">
                    Dashboard
                  </Button>
                  <button onClick={handleLogout} className="hidden md:block font-ui font-medium text-[14px] hover:text-[var(--color-mute)] transition-colors">
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      {}
      <div 
        className={`md:hidden fixed inset-0 z-[100] transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className="absolute top-0 left-0 bottom-0 w-[300px] bg-[var(--color-canvas)] border-r border-[var(--color-hairline-soft)] flex flex-col">
          <div className="h-20 px-6 flex items-center justify-between border-b border-[var(--color-hairline-soft)]">
            <div className="font-display text-[24px] uppercase tracking-normal text-[var(--color-ink)] leading-none">
              LEARNYST
            </div>
            <button 
              className="w-10 h-10 flex items-center justify-center text-[var(--color-ink)]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-8 px-6 flex flex-col gap-8">
            <div className="flex flex-col gap-6 font-display text-[32px] uppercase">
              <Link href="/" className="hover:text-[var(--color-mute)]">Courses</Link>
              <Link href="/" className="hover:text-[var(--color-mute)]">Bootcamps</Link>
              <Link href="/" className="hover:text-[var(--color-mute)]">Business</Link>
            </div>
            <div className="border-t border-[var(--color-hairline-soft)] pt-8 flex flex-col gap-6">
              {!token ? (
                <>
                  <Link href="/login" className="font-ui text-[18px] hover:text-[var(--color-mute)]">Log In</Link>
                  <Link href="/signup" className="font-ui text-[18px] font-medium">Join Learnyst</Link>
                </>
              ) : (
                <>
                  <Link href={params?.slug ? `/${params.slug}/dashboard` : '/dashboard'} className="font-ui text-[18px] hover:text-[var(--color-mute)]">Dashboard</Link>
                  <button onClick={handleLogout} className="text-left font-ui text-[18px] hover:text-[var(--color-mute)]">Sign Out</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
