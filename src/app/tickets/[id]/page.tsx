import { getTicketById } from "@/actions/ticket.actions";
import { getCurrentUser } from "@/lib/current-user";
import Link from "next/link";
import { notFound } from "next/navigation";
import CloseTicketButton from "@/components/CloseTicketButton";
import { ArrowLeft, AlertCircle, Calendar, FileText, Tag } from 'lucide-react';
import BackButton from "@/components/BackButton";

const TicketDetailsPage = async (props: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await props.params;
  const user = await getCurrentUser();

  if (!user) {
    notFound();
  }

  const ticket = await getTicketById(id, user);

  if (!ticket) {
    return (
      <div className='min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50 p-8 flex items-center justify-center'>
        <div className='bg-white border border-emerald-200 rounded-lg p-8 text-center max-w-md shadow-sm'>
          <AlertCircle className='w-12 h-12 text-red-500 mx-auto mb-4' />
          <h2 className='text-2xl font-bold text-emerald-900 mb-2'>Access Denied</h2>
          <p className='text-slate-600 mb-6'>You don't have permission to view this ticket</p>
          <BackButton/>
        </div>
      </div>
    );
  }

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

  return (
    <div className='min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50 p-8'>
      <div className='max-w-3xl mx-auto'>
        {/* Back Button */}
        <Link
          href='/'
          className='inline-flex items-center gap-2 text-slate-600 hover:text-emerald-700 mb-8 transition'
        >
          <ArrowLeft className='w-5 h-5' />
          Back to Home
        </Link>

        {/* Main Card */}
        <div className='bg-white border border-emerald-200 rounded-lg p-8 space-y-8 shadow-sm'>
          {/* Header */}
          <div className='border-b border-emerald-100 pb-6'>
            <div className='flex items-start justify-between gap-4 mb-4'>
              <div>
                <h1 className='text-4xl font-bold text-emerald-900 mb-3'>{ticket.subject}</h1>
                <div className='flex items-center gap-3'>
                  <span className={`px-3 py-1 rounded-lg border text-sm font-semibold ${getPriorityBadge(ticket.priority)}`}>
                    {ticket.priority} Priority
                  </span>
                  <span className={`px-3 py-1 rounded-lg border text-sm font-semibold ${getStatusBadge(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <div className='flex items-center gap-2 mb-3'>
              <FileText className='w-5 h-5 text-emerald-600' />
              <h2 className='text-xl font-semibold text-emerald-900'>Description</h2>
            </div>
            <div className='bg-emerald-50 border border-emerald-200 rounded-lg p-6'>
              <p className='text-slate-700 leading-relaxed'>{ticket.description}</p>
            </div>
          </div>

          {/* Metadata */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Department */}
            <div>
              <div className='flex items-center gap-2 mb-3'>
                <Tag className='w-5 h-5 text-teal-600' />
                <h3 className='text-sm font-semibold text-slate-700'>Department</h3>
              </div>
              <p className='text-lg text-emerald-900 font-medium'>{ticket.issuerDepartment}</p>
            </div>

            {/* Created At */}
            <div>
              <div className='flex items-center gap-2 mb-3'>
                <Calendar className='w-5 h-5 text-emerald-600' />
                <h3 className='text-sm font-semibold text-slate-700'>Created</h3>
              </div>
              <p className='text-lg text-emerald-900 font-medium'>{new Date(ticket.createdAt).toLocaleString()}</p>
            </div>
          </div>

          {/* Action Button */}
          {ticket.status !== 'Closed' && (
            <div className='border-t border-emerald-100 pt-6'>
              <CloseTicketButton
                ticketId={ticket.id}
                isClosed={ticket.status === 'Closed'}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketDetailsPage;