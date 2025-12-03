import { ReactNode } from 'react';
import AppShell from './AppShell';

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return <AppShell>{children}</AppShell>;
}
