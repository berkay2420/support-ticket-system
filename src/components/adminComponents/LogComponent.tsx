'use client'
import Link from "next/link";

interface LogComponentProps {
  log: {
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
  };
}

function getTimeAgo(date: Date) {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  return new Date(date).toLocaleDateString();
}

export default function LogComponent({ log }: LogComponentProps) {
  return (
    <div className='flex items-center justify-between border border-emerald-200 rounded-lg p-3 hover:bg-emerald-50 transition'>
      <div className='flex-1'>
        <p className='text-sm text-slate-900'>
          <Link href={`/users/${log.user.id}`}>
            <span className='font-semibold text-emerald-900'>{log.user.name || 'Unknown'}</span>
          </Link>
          {' '}
          <span className='text-slate-600'>{log.action.toLowerCase()}</span>
          {' '}
          <span className='font-medium text-emerald-700'>{log.entity.toLowerCase()}</span>
          {log.entityName && (
            <>
              {' '}
              <span className='text-slate-600'>"</span>
              <span className='font-semibold text-slate-900'>{log.entityName}</span>
              <span className='text-slate-600'>"</span>
            </>
          )}
        </p>
      </div>
      <span className='text-xs text-slate-500 ml-4 whitespace-nowrap'>
        {getTimeAgo(log.createdAt)} ago
      </span>
    </div>
  );
}