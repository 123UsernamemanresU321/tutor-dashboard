import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

type Props = {
  children: ReactNode;
};

export default function AppShell({ children }: Props) {
  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col" id="mainContent">
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-transparent px-6 py-6 space-y-6 max-w-7xl w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
