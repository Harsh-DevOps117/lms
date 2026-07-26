'use client';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import { 
  Menu, X, LogOut, Hexagon, Plus, Mail, LayoutDashboard, Activity, Users, 
  User, Settings, GraduationCap, MonitorPlay, BookOpen, 
  ClipboardList, HelpCircle, Search, Moon, Sun, CreditCard, Palette, Bot, Code
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { coreApi } from '@/api/client';
function NavLinks({ currentTab, onNavigate }: { currentTab: string, onNavigate?: () => void }) {
  const { roleId } = useAuthStore();
  const getLinkClass = (tab: string) => {
    const isActive = currentTab === tab;
    return isActive
      ? "flex items-center gap-3 bg-black text-white px-4 py-2 rounded-full text-[13px] font-medium w-full transition-all"
      : "flex items-center gap-3 text-gray-600 hover:text-black hover:bg-gray-100 px-4 py-2 rounded-full text-[13px] font-medium w-full transition-all";
  };
  const IconWrapper = ({ children, tab }: { children: React.ReactNode, tab: string }) => {
    const isActive = currentTab === tab;
    return (
      <div className={`${isActive ? 'text-white' : 'text-gray-500'} flex items-center justify-center`}>
        {children}
      </div>
    );
  };
  return (
    <>
      {roleId === 4 && (
        <>
          <div className="mb-6">
            <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4">Overview</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/dashboard?tab=global_analytics" onClick={onNavigate} className={getLinkClass('global_analytics')}>
                  <IconWrapper tab="global_analytics"><Activity size={16} strokeWidth={2.5} /></IconWrapper>
                  Platform Analytics
                </Link>
              </li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4">Manage</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/dashboard?tab=all_users" onClick={onNavigate} className={getLinkClass('all_users')}>
                  <IconWrapper tab="all_users"><Users size={16} strokeWidth={2.5} /></IconWrapper>
                  All Users
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
      {roleId === 1 && (
        <>
          <div className="mb-6">
            <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4">Overview</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/dashboard?tab=academy" onClick={onNavigate} className={getLinkClass('academy')}>
                  <IconWrapper tab="academy"><LayoutDashboard size={16} strokeWidth={2.5} /></IconWrapper>
                  My Academy
                </Link>
              </li>
              <li>
                <Link href="/dashboard?tab=templates" onClick={onNavigate} className={getLinkClass('templates')}>
                  <IconWrapper tab="templates"><Palette size={16} strokeWidth={2.5} /></IconWrapper>
                  Website Theme
                </Link>
              </li>
              <li>
                <Link href="/dashboard?tab=performance" onClick={onNavigate} className={getLinkClass('performance')}>
                  <IconWrapper tab="performance"><Activity size={16} strokeWidth={2.5} /></IconWrapper>
                  Performance
                </Link>
              </li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4">Manage</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/dashboard?tab=courses" onClick={onNavigate} className={getLinkClass('courses')}>
                  <IconWrapper tab="courses"><BookOpen size={16} strokeWidth={2.5} /></IconWrapper>
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/dashboard?tab=teachers" onClick={onNavigate} className={getLinkClass('teachers')}>
                  <IconWrapper tab="teachers"><GraduationCap size={16} strokeWidth={2.5} /></IconWrapper>
                  Teachers
                </Link>
              </li>
              <li>
                <Link href="/dashboard?tab=students" onClick={onNavigate} className={getLinkClass('students')}>
                  <IconWrapper tab="students"><Users size={16} strokeWidth={2.5} /></IconWrapper>
                  Students
                </Link>
              </li>
              <li>
                <Link href="/dashboard?tab=subscriptions" onClick={onNavigate} className={getLinkClass('subscriptions')}>
                  <IconWrapper tab="subscriptions"><CreditCard size={16} strokeWidth={2.5} /></IconWrapper>
                  Subscriptions
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
      {roleId === 2 && (
        <>
          <div className="mb-6">
            <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4">Teaching</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/dashboard?tab=courses" onClick={onNavigate} className={getLinkClass('courses')}>
                  <IconWrapper tab="courses"><MonitorPlay size={16} strokeWidth={2.5} /></IconWrapper>
                  My Courses
                </Link>
              </li>
              <li>
                <Link href="/dashboard?tab=assignments" onClick={onNavigate} className={getLinkClass('assignments')}>
                  <IconWrapper tab="assignments"><ClipboardList size={16} strokeWidth={2.5} /></IconWrapper>
                  Assignments
                </Link>
              </li>
              <li>
                <Link href="/dashboard?tab=students" onClick={onNavigate} className={getLinkClass('students')}>
                  <IconWrapper tab="students"><Users size={16} strokeWidth={2.5} /></IconWrapper>
                  Students
                </Link>
              </li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4">Tools</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/dashboard?tab=ai_tutor" onClick={onNavigate} className={getLinkClass('ai_tutor')}>
                  <IconWrapper tab="ai_tutor"><Bot size={16} strokeWidth={2.5} /></IconWrapper>
                  AI Tutor (Course Help)
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
      {roleId === 3 && (
        <>
          <div className="mb-6">
            <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4">My Learning</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/dashboard?tab=learning" onClick={onNavigate} className={getLinkClass('learning')}>
                  <IconWrapper tab="learning"><BookOpen size={16} strokeWidth={2.5} /></IconWrapper>
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/dashboard?tab=assignments" onClick={onNavigate} className={getLinkClass('assignments')}>
                  <IconWrapper tab="assignments"><ClipboardList size={16} strokeWidth={2.5} /></IconWrapper>
                  Assignments
                </Link>
              </li>
              <li>
                <Link href="/dashboard?tab=quizzes" onClick={onNavigate} className={getLinkClass('quizzes')}>
                  <IconWrapper tab="quizzes"><Activity size={16} strokeWidth={2.5} /></IconWrapper>
                  Quizzes
                </Link>
              </li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4">Tools</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/dashboard?tab=ai_tutor" onClick={onNavigate} className={getLinkClass('ai_tutor')}>
                  <IconWrapper tab="ai_tutor"><Bot size={16} strokeWidth={2.5} /></IconWrapper>
                  AI Tutor
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
}
function Sidebar() {
  const searchParams = useSearchParams();
  const { roleId, logout, userId } = useAuthStore();
  const currentTab = searchParams?.get('tab') || (roleId === 4 ? 'global_analytics' : roleId === 1 ? 'academy' : roleId === 2 ? 'courses' : 'learning');
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  useEffect(() => {
    if (userId) {
      coreApi.get(`/users/${userId}`).then(res => setProfile(res.data)).catch(console.error);
    }
  }, [userId]);
  const handleLogout = () => {
    logout();
    router.push('/login');
  };
  const getLinkClass = (tab: string) => {
    const isActive = currentTab === tab;
    return isActive
      ? "flex items-center gap-3 bg-black text-white px-4 py-2 rounded-full text-[13px] font-medium w-full transition-all"
      : "flex items-center gap-3 text-gray-600 hover:text-black hover:bg-gray-100 px-4 py-2 rounded-full text-[13px] font-medium w-full transition-all";
  };
  return (
    <aside className="w-[260px] hidden lg:flex flex-col bg-[#fafafa] border-r border-gray-200">
      {}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-display text-[22px] font-bold text-black tracking-tight px-2 py-1">Learnyst</span>
        </div>
      </div>
      {}
      <div className="px-4 pb-6 flex items-center gap-2">
        <button 
          onClick={() => router.push('/dashboard?tab=courses&action=create_course')}
          className="flex-1 flex items-center justify-center gap-2 bg-black text-white px-4 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <Plus size={16} />
          <span>Quick Create</span>
        </button>
        <button className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors text-gray-600">
          <Mail size={16} />
        </button>
      </div>
      {}
      <nav className="flex-1 overflow-y-auto px-2">
        <NavLinks currentTab={currentTab} />
      </nav>
      {}
      <div className="p-4 flex items-center justify-between hover:bg-gray-100 cursor-pointer transition-colors mt-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <User size={16} className="text-gray-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-gray-900 leading-tight">{profile?.first_name || 'User'}</span>
            <span className="text-[11px] text-gray-500 truncate max-w-[120px]">{profile?.email || 'user@example.com'}</span>
          </div>
        </div>
        <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors">
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}
function MobileDashboardNav() {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const { roleId, logout } = useAuthStore();
  const router = useRouter();
  const currentTab = searchParams?.get('tab') || (roleId === 4 ? 'global_analytics' : roleId === 1 ? 'academy' : roleId === 2 ? 'courses' : 'learning');
  const handleLogout = () => {
    logout();
    router.push('/login');
  };
  return (
    <div className="lg:hidden border-b border-gray-200 bg-white relative z-50">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <span className="font-display text-[20px] font-bold tracking-tight text-black px-2 py-1">Learnyst</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 p-4 shadow-lg max-h-[80vh] overflow-y-auto">
           <nav className="space-y-4">
             <NavLinks currentTab={currentTab} onNavigate={() => setIsOpen(false)} />
             <div className="pt-4 border-t border-gray-100">
               <button onClick={handleLogout} className="flex items-center gap-3 text-red-600 hover:bg-red-50 px-4 py-2 rounded-full text-[13px] font-medium w-full transition-all">
                 <LogOut size={16} />
                 Sign Out
               </button>
             </div>
           </nav>
        </div>
      )}
    </div>
  );
}
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const { roleId } = useAuthStore();
  const currentTab = searchParams?.get('tab') || (roleId === 4 ? 'global_analytics' : roleId === 1 ? 'academy' : roleId === 2 ? 'courses' : 'learning');
  const getTitle = () => {
    if (currentTab === 'global_analytics') return 'Platform Analytics';
    if (currentTab === 'academy') return 'My Academy';
    if (currentTab === 'courses') return 'Courses';
    if (currentTab === 'learning') return 'My Learning';
    return currentTab.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  return (
    <div className="min-h-screen bg-white flex text-[#111111] font-ui">
      {}
      <Suspense fallback={<aside className="w-[260px] hidden lg:block border-r border-gray-200 bg-[#fafafa]" />}>
        <Sidebar />
      </Suspense>
      <div className="flex-1 flex flex-col min-w-0">
        {}
        <Suspense fallback={<div className="h-16 bg-white border-b border-gray-200 lg:hidden" />}>
          <MobileDashboardNav />
        </Suspense>
        {}
        <header className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white hidden lg:flex sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-semibold text-gray-800">{getTitle()}</h1>
          </div>
          <div className="flex items-center gap-4">
          </div>
        </header>
        {}
        <main className="flex-1 p-4 md:p-8 bg-white overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
