'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { coreApi } from '@/api/client';
import { useAuthStore } from '@/store/authStore';
import { BookOpen, PlayCircle, Clock } from 'lucide-react';
import Link from 'next/link';
export default function TenantDashboard() {
  const { slug } = useParams();
  const router = useRouter();
  const { userId, token, logout } = useAuthStore();
  const [tenant, setTenant] = useState<any>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!token || !userId) {
      router.push(`/${slug}/login`);
      return;
    }
    const fetchData = async () => {
      try {
        const tenantRes = await coreApi.get(`/tenants/slug/${slug}`);
        const tenantData = tenantRes.data.tenant;
        setTenant(tenantData);
        const coursesRes = await coreApi.get(`/students/${userId}/courses?tenant_id=${tenantData.id}`);
        setEnrolledCourses(coursesRes.data || []);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug, userId, token, router]);
  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-ada-bg)] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[var(--color-ada-bg)] ada-body text-[#111]">
      {}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 md:px-8 md:pt-6">
        <nav className="max-w-[1440px] mx-auto bg-white border-2 border-[#111] shadow-[4px_4px_0px_#111] rounded-full h-16 flex items-center justify-between px-6 transition-all duration-300">
          <div className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => router.push(`/${slug}`)}>
            {tenant?.logo_url ? (
              <img src={tenant.logo_url} alt="Logo" className="h-8 w-auto object-contain" />
            ) : (
              <span className="ada-heading text-[20px] font-bold tracking-tight text-[#111]">
                {tenant?.academy_name || 'Academy'}
              </span>
            )}
          </div>
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-[14px] font-medium text-[#111] hover:text-[var(--color-ada-primary)] transition-colors hidden sm:block">
              Learnyst Hub
            </Link>
            <button 
              onClick={() => {
                logout();
                router.push(`/${slug}/login`);
              }} 
              className="text-[14px] font-medium text-red-600 hover:text-red-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </nav>
      </div>
      {}
      <main className="max-w-[1200px] mx-auto px-6 pt-32 pb-12">
        <h1 className="ada-heading text-[48px] md:text-[64px] text-[#111] mb-2 leading-none">My Learning</h1>
        <p className="text-[#111] opacity-70 mb-12 text-[18px]">Pick up right where you left off.</p>
        {enrolledCourses.length === 0 ? (
          <div className="bg-white rounded-[20px] border-2 border-[#111] shadow-[8px_8px_0px_#111] p-16 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-[var(--color-ada-secondary)] border-2 border-[#111] shadow-[4px_4px_0px_#111] rounded-full flex items-center justify-center mx-auto mb-8">
              <BookOpen className="text-[#111]" size={32} />
            </div>
            <h3 className="ada-heading text-[32px] text-[#111] mb-2">No courses yet</h3>
            <p className="text-[#111] opacity-70 mb-8 text-[16px]">You aren't enrolled in any courses in this academy.</p>
            <button 
              onClick={() => router.push(`/${slug}#courses`)}
              className="bg-[var(--color-ada-primary)] text-[#111] px-8 py-3 rounded-full text-[15px] font-medium border-2 border-[#111] shadow-[4px_4px_0px_#111] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#111] active:scale-95 transition-all"
            >
              Browse Catalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enrolledCourses.map((course) => (
              <div 
                key={course.id} 
                className="bg-white rounded-[20px] border-2 border-[#111] shadow-[8px_8px_0px_#111] overflow-hidden hover:translate-y-1 hover:shadow-[4px_4px_0px_#111] transition-all duration-300 group flex flex-col"
              >
                <div className="aspect-video bg-[var(--color-ada-bg)] border-b-2 border-[#111] relative overflow-hidden">
                  {course.thumbnail_url ? (
                    <img 
                      src={course.thumbnail_url} 
                      alt={course.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-[#111]">
                      <BookOpen size={40} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <PlayCircle size={48} className="text-white" />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-[12px] font-medium text-[#111] opacity-70 mb-2">
                    <span>Course</span>
                  </div>
                  <h3 className="ada-heading text-[24px] text-[#111] mb-2 leading-tight line-clamp-2 group-hover:text-[var(--color-ada-primary)] transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-[15px] text-[#111] opacity-70 line-clamp-2 mb-6 flex-grow">
                    {course.description}
                  </p>
                  <div className="mt-auto">
                    <button 
                      onClick={() => router.push(`/${slug}/courses/${course.id}`)}
                      className="w-full bg-white hover:bg-[var(--color-ada-secondary)] text-[#111] border-2 border-[#111] text-[15px] font-medium py-3 rounded-full shadow-[2px_2px_0px_#111] hover:translate-y-[1px] hover:shadow-[0px_0px_0px_#111] transition-all"
                    >
                      Continue Learning
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
