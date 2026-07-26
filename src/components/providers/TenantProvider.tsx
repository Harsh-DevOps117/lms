'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { coreApi } from '@/api/client';
import { useParams } from 'next/navigation';

interface TenantConfig {
  academy_name: string;
  academy_slug: string;
  logo_url: string;
  banner_url: string;
  custom_domain: string;
}

interface TenantContextType {
  tenant: TenantConfig | null;
  loading: boolean;
  error: string | null;
}

const TenantContext = createContext<TenantContextType>({
  tenant: null,
  loading: true,
  error: null,
});

export const useTenant = () => useContext(TenantContext);

export const TenantProvider = ({ children }: { children: ReactNode }) => {
  const { slug } = useParams();
  const [tenant, setTenant] = useState<TenantConfig | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchTenant = async () => {
      try {
        const res = await coreApi.get(`/tenants/slug/${slug}`);
        setTenant(res.data.tenant);
      } catch (err: any) {
        console.error("Failed to load tenant details", err);
        setError(err.response?.data?.error || "Failed to load tenant");
      } finally {
        setLoading(false);
      }
    };

    fetchTenant();
  }, [slug]);

  return (
    <TenantContext.Provider value={{ tenant, loading, error }}>
      {children}
    </TenantContext.Provider>
  );
};
