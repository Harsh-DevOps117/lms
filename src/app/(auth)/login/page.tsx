'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { authApi } from '@/api/client';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const verified = searchParams.get('verified') === 'true';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const setAuth = useAuthStore((state) => state.setAuth);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
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
      const response = await authApi.post('/login', {
        email,
        password,
        device_name
      });
      const { access_token, user_id, role_id } = response.data;
      setAuth(access_token, role_id || 1, user_id);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {verified && (
        <div className="bg-green-500 text-black border-2 border-black p-4 text-sm font-bold uppercase">
          Account verified! Please sign in.
        </div>
      )}
      {error && (
        <div className="bg-red-500 text-white border-2 border-black p-4 text-sm font-bold uppercase">
          {error}
        </div>
      )}
      <div className="space-y-4">
        <Input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="!bg-white !text-black !rounded-none !border-2 !border-black focus:!ring-0 focus:!border-gray-500"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="!bg-white !text-black !rounded-none !border-2 !border-black focus:!ring-0 focus:!border-gray-500"
        />
      </div>
      <Button type="submit" variant="primary" className="w-full !rounded-none !bg-black !text-white hover:!bg-gray-800 border-2 border-black" disabled={loading}>
        {loading ? 'SIGNING IN...' : 'SIGN IN'}
      </Button>
      <div className="text-center mt-4">
        <p className="font-ui text-[14px] text-gray-500 font-medium">
          Don't have an account?{' '}
          <Link href="/signup" className="text-black font-bold uppercase tracking-wide hover:underline">
            Join Us
          </Link>
        </p>
      </div>
    </form>
  );
}
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center mt-8 font-ui">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
