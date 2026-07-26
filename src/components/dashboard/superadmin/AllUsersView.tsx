'use client';

import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function AllUsersView({ users, handleDeleteUser }: { users: any[], handleDeleteUser: (id: number) => void }) {
  if (!users) {
    return (
      <div className="space-y-4 gsap-stagger-item animate-pulse">
        <div className="h-16 bg-gray-200 border-2 border-black"></div>
        <div className="h-16 bg-gray-200 border-2 border-black"></div>
        <div className="h-16 bg-gray-200 border-2 border-black"></div>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center gsap-stagger-item">
        <h2 className="font-ui font-bold text-[24px] text-black leading-[1.2] uppercase tracking-widest">
          All Registered Users
        </h2>
      </div>

      <div className="bg-white border-2 border-black overflow-hidden gsap-stagger-item">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-black bg-gray-100">
                <th className="py-4 px-6 font-ui text-[14px] uppercase tracking-widest text-black font-bold border-r-2 border-black">Name</th>
                <th className="py-4 px-6 font-ui text-[14px] uppercase tracking-widest text-black font-bold border-r-2 border-black">Email</th>
                <th className="py-4 px-6 font-ui text-[14px] uppercase tracking-widest text-black font-bold border-r-2 border-black">Role</th>
                <th className="py-4 px-6 font-ui text-[14px] uppercase tracking-widest text-black font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b-2 border-black last:border-b-0 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 border-r-2 border-black">
                    <div className="font-ui text-[16px] text-black font-bold uppercase">
                      {u.first_name} {u.last_name}
                    </div>
                    <div className="font-ui text-[14px] text-gray-600 font-semibold tracking-widest">{u.phone}</div>
                  </td>
                  <td className="py-4 px-6 font-ui text-[14px] text-black font-semibold border-r-2 border-black">{u.email}</td>
                  <td className="py-4 px-6 border-r-2 border-black">
                    <span className="inline-block px-3 py-1 bg-black font-ui text-[12px] uppercase tracking-widest text-white font-semibold">
                      {u.role_name}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {u.role_id !== 4 && (
                      <Button 
                        variant="secondary" 
                        onClick={() => handleDeleteUser(u.id)}
                        className="bg-red-600 text-white border-2 border-red-600 hover:bg-red-700 rounded-none uppercase tracking-widest font-bold flex items-center justify-center gap-2 ml-auto"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center font-ui text-gray-500 font-semibold uppercase tracking-widest">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
