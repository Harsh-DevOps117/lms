'use client';

import { Activity, Users } from 'lucide-react';

export function GlobalAnalyticsView({ analytics }: { analytics: any }) {
  if (!analytics) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gsap-stagger-item animate-pulse">
        <div className="h-40 bg-gray-200 border-2 border-black"></div>
        <div className="h-40 bg-gray-200 border-2 border-black"></div>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center gsap-stagger-item">
        <h2 className="font-ui font-bold text-[24px] text-black leading-[1.2] uppercase tracking-widest">
          Platform Overview
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black text-white p-8 md:p-10 border-2 border-black gsap-stagger-item flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-white flex items-center justify-center border-2 border-white">
              <Users className="w-5 h-5 text-black" />
            </div>
            <span className="font-ui text-[14px] uppercase tracking-widest font-semibold">Total Users</span>
          </div>
          <div>
            <span className="font-display text-[64px] md:text-[80px] leading-none">
              {analytics.total_users || 0}
            </span>
          </div>
        </div>

        <div className="bg-[#1ED760] p-8 md:p-10 border-2 border-black gsap-stagger-item flex flex-col justify-between transition-colors hover:bg-[#18B24E]">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-black flex items-center justify-center border-2 border-black">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="font-ui text-[14px] uppercase tracking-widest text-black font-semibold">Learnyst Profit</span>
          </div>
          <div className="flex items-baseline gap-2 text-black">
            <span className="font-ui text-[24px] mb-2 font-bold">{analytics.currency || 'INR'}</span>
            <span className="font-display text-[64px] md:text-[80px] leading-none">
              {analytics.total_profit || 0}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
