'use client';
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { authApi, coreApi } from '@/api/client';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
function AcceptInviteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth } = useAuthStore();
  useEffect(() => {
    if (!token) {
      toast.error('Invalid or missing invitation token.');
    }
  }, [token]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 1. Log in to get the JWT and User ID
      let device_name = "Unknown Device";
      if (typeof navigator !== "undefined") {
        const ua = navigator.userAgent;
        if (/android/i.test(ua)) device_name = "Android Mobile";
        else if (/iPad|iPhone|iPod/.test(ua)) device_name = "iOS Mobile";
        else if (/Windows/i.test(ua)) device_name = "Windows Desktop";
        else if (/Mac/i.test(ua)) device_name = "Mac Desktop";
        else if (/Linux/i.test(ua)) device_name = "Linux Desktop";
        else device_name = "Web Browser";
      }
      const loginRes = await authApi.post('/login', {
        email,
        password,
        device_name
      });
      const { access_token, user_id, role_id } = loginRes.data;
      setAuth(access_token, role_id || 1, user_id);
      await coreApi.post('/invitations/accept', {
        token,
        user_id: user_id
      }, {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      toast.success('Invitation accepted! Welcome to the academy.');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to accept invitation. Make sure you are registered.');
    }
  };
  return (
    <div className="min-h-screen bg-[var(--color-canvas)] flex flex-col items-center justify-center p-6">
      <div className="max-w-[400px] w-full">
        <h1 className="font-display text-[48px] uppercase text-[var(--color-ink)] leading-none mb-2 text-center">
          ACCEPT INVITATION
        </h1>
        <p className="font-ui text-[16px] text-[var(--color-mute)] mb-8 text-center">
          Log in with your existing teacher account to join the academy.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input 
            type="email" 
            placeholder="Email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" className="mt-4">
            Join Academy
          </Button>
        </form>
      </div>
    </div>
  );
}
export default function AcceptInvitePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--color-canvas)] flex items-center justify-center font-display text-[24px]">LOADING...</div>}>
      <AcceptInviteForm />
    </Suspense>
  );
}
