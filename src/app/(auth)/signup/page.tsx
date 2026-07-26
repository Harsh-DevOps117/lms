'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { authApi } from '@/api/client';
import Link from 'next/link';
export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '',
    phoneNumber: '',
    password: '',
    role: 'Student',
    location: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);
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
      let role_id = 1;
      if (formData.role === 'Teacher') role_id = 2;
      if (formData.role === 'Student') role_id = 3;
      await authApi.post('/register/initiate', {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.countryCode + formData.phoneNumber,
        password: formData.password,
        role_id: role_id,
        location: formData.location,
      });
      const fullPhone = formData.countryCode + formData.phoneNumber;
      router.push(`/verify?phone=${encodeURIComponent(fullPhone)}`);
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred during signup.');
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
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
            className="!bg-white !text-black !rounded-none !border-2 !border-black focus:!ring-0 focus:!border-gray-500"
          />
          <Input
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
            className="!bg-white !text-black !rounded-none !border-2 !border-black focus:!ring-0 focus:!border-gray-500"
          />
        </div>
        <Input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="!bg-white !text-black !rounded-none !border-2 !border-black focus:!ring-0 focus:!border-gray-500"
        />
        <div className="flex gap-2">
          <select
            className="bg-white text-black px-4 py-3 border-2 border-black outline-none font-ui text-[16px] w-[130px] focus:border-gray-500 transition-all appearance-none cursor-pointer"
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
            className="flex-1 !bg-white !text-black !rounded-none !border-2 !border-black focus:!ring-0 focus:!border-gray-500"
          />
        </div>
        <Input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          className="!bg-white !text-black !rounded-none !border-2 !border-black focus:!ring-0 focus:!border-gray-500"
        />
        <div className="flex gap-2">
          <Input
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
            className="flex-1 !bg-white !text-black !rounded-none !border-2 !border-black focus:!ring-0 focus:!border-gray-500"
          />
          <Button type="button" variant="secondary" className="border-2 border-black !rounded-none bg-gray-100 hover:bg-gray-200 text-black px-4" onClick={handleGetLocation} disabled={locationLoading}>
            {locationLoading ? "..." : "Detect"}
          </Button>
        </div>
        <select
          className="bg-white text-black px-4 py-3 border-2 border-black outline-none font-ui text-[16px] w-full focus:border-gray-500 transition-all appearance-none cursor-pointer"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="Tenant">Academy Owner (Tenant)</option>
          <option value="Teacher">Teacher</option>
          <option value="Student">Student</option>
        </select>
      </div>
      <Button type="submit" variant="primary" className="w-full !rounded-none !bg-black !text-white hover:!bg-gray-800 border-2 border-black" disabled={loading}>
        {loading ? 'INITIATING...' : 'SIGN UP'}
      </Button>
      <div className="text-center mt-4">
        <p className="font-ui text-[14px] text-gray-500 font-medium">
          Already have an account?{' '}
          <Link href="/login" className="text-black font-bold uppercase tracking-wide hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </form>
  );
}
