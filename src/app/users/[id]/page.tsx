import { getCurrentUser } from "@/lib/current-user";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, AlertCircle, Calendar, Mail, Building2, Ticket, Clock, Trash2, Edit, User as UserIcon } from 'lucide-react';
import BackButton from "@/components/BackButton";
import { getUser } from "@/actions/admin.actions";
import UserAvatar from "@/components/UserAvatar";

const UserDetailsPage = async (props: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await props.params;
  const currentUser = await getCurrentUser();

  if (!currentUser?.isAdmin) {
    notFound();
  }

  const user = await getUser(id);

  if (!user) {
    return (
      <div className='min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50 p-8 flex items-center justify-center'>
        <div className='bg-white border border-emerald-200 rounded-lg p-8 text-center max-w-md shadow-sm'>
          <AlertCircle className='w-12 h-12 text-red-500 mx-auto mb-4' />
          <h2 className='text-2xl font-bold text-emerald-900 mb-2'>User Not Found</h2>
          <p className='text-slate-600 mb-6'>The user you're looking for doesn't exist</p>
          <Link
            href='/admin'
            className='inline-flex items-center gap-2 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-md'
          >
            <ArrowLeft className='w-5 h-5' />
            Back to Admin
          </Link>
        </div>
      </div>
    );
  }

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

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'High':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Low':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'Closed' 
      ? 'bg-slate-50 text-slate-700 border-slate-200'
      : 'bg-emerald-50 text-emerald-700 border-emerald-200';
  };

  const totalMinutes = user.time_tracking_tickets.reduce((sum, t) => sum + (t.workedMinutes ?? 0), 0);
  const totalHours = (totalMinutes / 60).toFixed(1);

  return (
    <div className='min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50 p-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Back Button */}
        <BackButton/>
        
        {/* Main Card */}
        <div className='bg-white border border-emerald-200 rounded-lg shadow-sm overflow-hidden'>
          {/* Header with Avatar */}
           <div className='bg-linear-to-r from-emerald-600 to-teal-600 p-8'>
            <div className='flex items-start gap-6'>
              <UserAvatar name={user.name} size='xl' />
              <div className='flex-1 text-white'>
                <h1 className='text-4xl font-bold mb-2'>{user.name}</h1>
                <p className='text-emerald-100 text-lg'>{user.email}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className='p-8 space-y-8'>

            {/* User Info Grid */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {/* Department */}
              <div className='bg-slate-50 border border-slate-200 rounded-lg p-4'>
                <div className='flex items-center gap-2 mb-3'>
                  <Building2 className='w-5 h-5 text-emerald-600' />
                  <h3 className='text-sm font-semibold text-slate-700'>Department</h3>
                </div>
                <p className={`text-lg font-semibold px-3 py-1 rounded-lg border inline-block ${getDepartmentColor(user.department)}`}>
                  {user.department}
                </p>
              </div>

              {/* Joined Date */}
              <div className='bg-slate-50 border border-slate-200 rounded-lg p-4'>
                <div className='flex items-center gap-2 mb-3'>
                  <Calendar className='w-5 h-5 text-emerald-600' />
                  <h3 className='text-sm font-semibold text-slate-700'>Joined</h3>
                </div>
                <p className='text-lg text-emerald-900 font-medium'>{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>

              {/* User ID */}
              <div className='bg-slate-50 border border-slate-200 rounded-lg p-4'>
                <div className='flex items-center gap-2 mb-3'>
                  <Mail className='w-5 h-5 text-emerald-600' />
                  <h3 className='text-sm font-semibold text-slate-700'>User ID</h3>
                </div>
                <p className='text-sm text-emerald-900 font-mono break-all'>
                  {user.id.substring(0, 8)}...{user.id.substring(user.id.length - 4)}
                </p>
              </div>
            </div>

            {/* Tickets Section */}
            <div className='border-t border-emerald-100 pt-8'>
              <div className='flex items-center gap-2 mb-4'>
                <Ticket className='w-6 h-6 text-emerald-600' />
                <h2 className='text-2xl font-bold text-emerald-900'>Tickets ({user.tickets.length})</h2>
              </div>
              {user.tickets.length === 0 ? (
                <p className='text-slate-600'>No tickets assigned to this user.</p>
              ) : (
                <div className='space-y-3'>
                  {user.tickets.map((ticket) => (
                    <Link
                      key={ticket.id}
                      href={`/tickets/${ticket.id}`}
                      className='block group'
                    >
                      <div className='bg-white border border-emerald-200 rounded-lg p-4 transition-all duration-300 hover:border-emerald-400 hover:shadow-md hover:-translate-y-0.5'>
                        <div className='flex items-start justify-between gap-4'>
                          <div className='flex-1'>
                            <h3 className='font-semibold text-emerald-900 group-hover:text-emerald-700 transition'>
                              {ticket.subject}
                            </h3>
                          </div>
                          <div className='flex items-center gap-2 shrink-0'>
                            <span className={`px-3 py-1 rounded-lg border text-xs font-semibold ${getPriorityBadge(ticket.priority)}`}>
                              {ticket.priority}
                            </span>
                            <span className={`px-3 py-1 rounded-lg border text-xs font-semibold ${getStatusBadge(ticket.status)}`}>
                              {ticket.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Time Tracking Section */}
            <div className='border-t border-emerald-100 pt-8'>
              <div className='flex items-center gap-2 mb-4'>
                <Clock className='w-6 h-6 text-emerald-600' />
                <h2 className='text-2xl font-bold text-emerald-900'>Time Tracking ({user.time_tracking_tickets.length})</h2>
              </div>
              <div className='mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg'>
                <p className='text-sm text-slate-600'>Total Time</p>
                <p className='text-3xl font-bold text-emerald-900'>{totalHours} hours</p>
              </div>
              {user.time_tracking_tickets.length === 0 ? (
                <p className='text-slate-600'>No time tracking records.</p>
              ) : (
                <div className='space-y-3'>
                  {user.time_tracking_tickets.map((record) => (
                    <Link
                      key={record.id}
                      href={`/time-tracking-tickets/${record.id}`}
                      className='block group'
                    >
                      <div className='bg-slate-50 border border-slate-200 rounded-lg p-4 transition-all duration-300 hover:border-emerald-400 hover:shadow-md hover:-translate-y-0.5'>
                        <div className='flex items-center justify-between'>
                          <p className='font-medium text-slate-900 group-hover:text-emerald-700 transition'>{record.description}</p>
                          <p className='text-slate-600 font-semibold'>{record.workedMinutes ?? 0} min</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className='border-t border-emerald-100 pt-8 flex gap-3'>
              <button className='flex items-center gap-2 bg-linear-to-br from-emerald-600 to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-md hover:-translate-y-0.5'>
                <Edit className='w-5 h-5' />
                Edit User
              </button>
              <button className='flex items-center gap-2 bg-red-50 text-red-700 border border-red-200 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-red-100'>
                <Trash2 className='w-5 h-5' />
                Delete User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;