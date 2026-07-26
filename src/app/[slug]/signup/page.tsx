'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { authApi, coreApi } from '@/api/client';
import Link from 'next/link';
export default function TenantSignupPage() {
  const router = useRouter();
  const { slug } = useParams();
  const [tenant, setTenant] = useState<any>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '',
    phoneNumber: '',
    password: '',
    location: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);
  useEffect(() => {
    // Fetch tenant details for branding
    coreApi.get(`/tenants/slug/${slug}`).then((res) => {
      setTenant(res.data.tenant);
    }).catch(err => {
      console.error("Failed to load tenant details", err);
    });
  }, [slug]);
  const handleGetLocation = () => {
    setLocationLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`);
            const data = await res.json();
            const city = data.address?.city || data.address?.town || data.address?.village || data.address?.state || `${latitude}, ${longitude}`;
            setFormData({
              ...formData,
              location: city
            });
          } catch (e) {
            setFormData({
              ...formData,
              location: `${position.coords.latitude}, ${position.coords.longitude}`
            });
          }
          setLocationLoading(false);
        },
        (error) => {
          console.error(error);
          setLocationLoading(false);
          alert("Could not access location. Please enter manually.");
        }
      );
    } else {
      setLocationLoading(false);
      alert("Geolocation is not supported by your browser.");
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Hardcode role_id to 3 for Student
      await authApi.post('/register/initiate', {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.countryCode + formData.phoneNumber,
        password: formData.password,
        role_id: 3, 
        location: formData.location,
      });
      const fullPhone = formData.countryCode + formData.phoneNumber;
      router.push(`/verify?phone=${encodeURIComponent(fullPhone)}&slug=${slug}`);
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred during signup.');
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
          Join {tenant?.academy_name || 'the Academy'}
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
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                  className="w-full placeholder:text-[#111]/70 !border-2 !border-[#111] !rounded-full !shadow-[2px_2px_0px_#111] px-4 py-2 focus:!border-[var(--color-ada-primary)]"
                />
                <Input
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                  className="w-full placeholder:text-[#111]/70 !border-2 !border-[#111] !rounded-full !shadow-[2px_2px_0px_#111] px-4 py-2 focus:!border-[var(--color-ada-primary)]"
                />
              </div>
              <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full placeholder:text-[#111]/70 !border-2 !border-[#111] !rounded-full !shadow-[2px_2px_0px_#111] px-4 py-2 focus:!border-[var(--color-ada-primary)]"
              />
              <div className="flex gap-2">
                <select
                  className="bg-white text-[#111] px-4 py-2 border-2 border-[#111] rounded-full shadow-[2px_2px_0px_#111] outline-none ada-body text-[14px] w-[110px] focus:border-[var(--color-ada-primary)] transition-all appearance-none cursor-pointer"
                  value={formData.countryCode}
                  onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                  required
                >
                  <option value="" disabled>Code</option>
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+61">🇦🇺 +61</option>
                </select>
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  required
                  className="flex-1 placeholder:text-[#111]/70 !border-2 !border-[#111] !rounded-full !shadow-[2px_2px_0px_#111] px-4 py-2 focus:!border-[var(--color-ada-primary)]"
                />
              </div>
              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full placeholder:text-[#111]/70 !border-2 !border-[#111] !rounded-full !shadow-[2px_2px_0px_#111] px-4 py-2 focus:!border-[var(--color-ada-primary)]"
              />
              <div className="flex gap-2">
                <Input
                  placeholder="Location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                  className="flex-1 placeholder:text-[#111]/70 !border-2 !border-[#111] !rounded-full !shadow-[2px_2px_0px_#111] px-4 py-2 focus:!border-[var(--color-ada-primary)]"
                />
                <Button type="button" variant="secondary" className="border-2 border-[#111]  bg-white hover:bg-gray-50 text-[#111] font-medium !rounded-full shadow-[2px_2px_0px_#111] px-4" onClick={handleGetLocation} disabled={locationLoading}>
                  {locationLoading ? "..." : "Detect"}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-[var(--color-ada-primary)] text-[#111] font-medium !rounded-full border-2 border-[#111] shadow-[4px_4px_0px_#111] hover:brightness-95 hover:-translate-y-0.5 transition-all" disabled={loading}>
              {loading ? 'SIGNING UP...' : 'SIGN UP'}
            </Button>
            <div className="mt-6 text-center">
              <p className="text-sm text-[#111] opacity-80">
                Already have an account?{' '}
                <Link href={`/${slug}/login`} className="font-medium text-black hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
