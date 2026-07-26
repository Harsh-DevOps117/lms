import { TenantProvider } from '@/components/providers/TenantProvider';
import { ReactNode } from 'react';

export default function TenantLayout({ children }: { children: ReactNode }) {
  return (
    <TenantProvider>
      {children}
    </TenantProvider>
  );
}
