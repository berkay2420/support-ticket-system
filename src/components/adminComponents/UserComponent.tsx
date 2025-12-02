import Link from 'next/link';
import { Users } from 'lucide-react';

type UserComponentProps = {
  user: {
    id: string;
    name: string | null;
    email: string;
    department: string;
  }
}

const UserComponent = ({ user }: UserComponentProps) => {
  const getDepartmentColor = (department: string) => {
    switch(department?.toLowerCase()) {
      case 'it':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'hr':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'finance':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'sales':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'marketing':
        return 'text-pink-600 bg-pink-50 border-pink-200';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  return (
    <Link href={`/users/${user.id}`} className={`group block`}>
      <div className="bg-white border border-emerald-200 rounded-lg p-5 transition-all duration-300 hover:border-emerald-400 hover:shadow-md hover:-translate-y-0.5">
        <div className='flex items-start justify-between gap-4'>
          {/* Left Side */}
          <div className='flex-1 min-w-0'>
            <div className='flex items-start gap-3'>
              <Users className='w-5 h-5 text-emerald-600 shrink-0 mt-0.5' />
              <div className='flex-1 min-w-0'>
                <h2 className='text-lg font-semibold text-slate-900 group-hover:text-emerald-700 transition truncate'>
                  {user.name || 'Unnamed User'}
                </h2>
                <p className='text-sm text-slate-600 mt-1 truncate'>
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className='flex items-center gap-3 shrink-0'>
            <div className={`px-3 py-1 rounded-lg border text-xs font-semibold ${getDepartmentColor(user.department)}`}>
              {user.department}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserComponent;