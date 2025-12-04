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
  isInterActive?: boolean;
}

export default function ActivityPanel({ logs, isInterActive = false }: ActivityPanelProps) {
  return (
    <div className='bg-white border border-emerald-200 rounded-lg p-6 shadow-sm'>
      
      {/* TITLE + NOTICE */}
      <div className='flex items-center gap-2 mb-2'>
        <Activity className='w-6 h-6 text-emerald-600' />
        <h2 className='text-2xl font-bold text-emerald-900'>Activity Log</h2>

        {!isInterActive && (
          <span className='text-sm text-red-600 ml-2'>
            (Only managers can interact)
          </span>
        )}
      </div>

      <div className='mb-4 text-slate-600'>
        {!isInterActive && (
          <p className='text-xs opacity-80'>
            You can view logs but cannot interact with them.
          </p>
        )}
      </div>

      {logs.length === 0 ? (
        <div className='text-center py-8'>
          <p className='text-slate-600'>No activity yet</p>
        </div>
      ) : (
        <div
          className={`
            space-y-2 max-h-96 overflow-y-auto
            ${isInterActive ? 'cursor-pointer' : 'pointer-events-none opacity-60'}
          `}
        >
          {logs.map((log) => (
            <LogComponent key={log.id} log={log} />
          ))}
        </div>
      )}
    </div>
  );
}