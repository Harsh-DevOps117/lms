'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { authApi, coreApi } from '@/api/client';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
export default function TenantLoginPage() {
  const router = useRouter();
  const { slug } = useParams();
  const [tenant, setTenant] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const setAuth = useAuthStore((state) => state.setAuth);
  useEffect(() => {
    // Fetch tenant details for branding
    coreApi.get(`/tenants/slug/${slug}`).then((res) => {
      setTenant(res.data.tenant);
    }).catch(err => {
      console.error("Failed to load tenant details", err);
    });
  }, [slug]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await authApi.post('/login', {
        email,
        password,
        device_name: "Web Browser"
      });
      const { access_token, user_id, role_id } = response.data;
      setAuth(access_token, role_id || 1, user_id);
      router.push(`/${slug}/dashboard`);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[var(--color-ada-bg)] ada-body flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-ui">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          {tenant?.logo_url ? (
            <img src={tenant.logo_url} alt="Logo" className="h-12 w-auto object-contain" />
          ) : (
            <span className="ada-heading text-[32px] text-[#111] tracking-tight">
              {tenant?.academy_name || 'Loading...'}
            </span>
          )}
        </div>
        <h2 className="text-center text-3xl ada-heading font-extrabold text-[#111]">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 sm:px-10 border-2 border-[#111] shadow-[8px_8px_0px_#111] rounded-[20px]">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-[#111] font-bold">Email address</label>
              <div className="mt-1">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full placeholder:text-[#111]/70 !border-2 !border-[#111] !rounded-full !shadow-[2px_2px_0px_#111] px-4 py-2 focus:!border-[var(--color-ada-primary)]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#111] font-bold">Password</label>
              <div className="mt-1">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full placeholder:text-[#111]/70 !border-2 !border-[#111] !rounded-full !shadow-[2px_2px_0px_#111] px-4 py-2 focus:!border-[var(--color-ada-primary)]"
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-[var(--color-ada-primary)] text-[#111] font-medium !rounded-full border-2 border-[#111] shadow-[4px_4px_0px_#111] hover:brightness-95 hover:-translate-y-0.5 transition-all" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-[#111] opacity-80">
              Don't have an account?{' '}
              <Link href={`/${slug}/signup`} className="font-medium text-black hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
