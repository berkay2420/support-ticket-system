'use client';

import { Activity } from 'lucide-react';
import LogComponent from './LogComponent';

interface ActivityLog {
  id: string;
  action: string;
  entity: string;
  entityName: string | null;
  description: string;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
    email: string;
  };
}
interface ActivityPanelProps {
  logs: ActivityLog[];
}

export default function ActivityPanel({ logs }: ActivityPanelProps) {
  return (
    <div className='bg-white border border-emerald-200 rounded-lg p-6 shadow-sm'>
      <div className='flex items-center gap-2 mb-6'>
        <Activity className='w-6 h-6 text-emerald-600' />
        <h2 className='text-2xl font-bold text-emerald-900'>Activity Log</h2>
      </div>

      {logs.length === 0 ? (
        <div className='text-center py-8'>
          <p className='text-slate-600'>No activity yet</p>
        </div>
      ) : (
        <div className='space-y-2 max-h-96 overflow-y-auto'>
          {logs.map((log) => (
            <LogComponent key={log.id} log={log} />
          ))}
        </div>
      )}
    </div>
  );
}