'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { authApi } from '@/api/client';

function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get('phone') || '';
  
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authApi.post('/register/complete', {
        target: phone,
        code: otp,
      });
      router.push('/login?verified=true');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-500 text-white border-2 border-black p-4 text-sm font-bold uppercase">
          {error}
        </div>
      )}
      <div className="text-center mb-6">
        <p className="font-ui text-[16px] text-black font-bold uppercase tracking-wide">
          Enter the SMS code sent to {phone}
        </p>
      </div>
      <div className="space-y-4">
        <Input
          type="text"
          placeholder="6-Digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          className="text-center text-2xl tracking-[0.5em] !bg-white !text-black !rounded-none !border-2 !border-black focus:!ring-0 focus:!border-gray-500"
          required
        />
      </div>

      <Button type="submit" variant="primary" className="w-full !rounded-none !bg-black !text-white hover:!bg-gray-800 border-2 border-black" disabled={loading || !phone}>
        {loading ? 'VERIFYING...' : 'VERIFY PHONE'}
      </Button>
    </form>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="text-center mt-8 font-ui">Loading...</div>}>
      <VerifyForm />
    </Suspense>
  );
}
