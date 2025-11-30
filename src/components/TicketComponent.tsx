import type { Ticket } from "@/generated/prisma/client";
import Link from 'next/link';
import { ChevronRight, AlertCircle } from 'lucide-react';

type TicketComponentProps = {
  ticket: Ticket
}

const TicketComponent = ({ ticket }: TicketComponentProps) => {
  const isClosed = ticket.status === 'Closed';
  
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'High':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'Low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  return (
    <Link href={`/tickets/${ticket.id}`} className={`group block`}>
      <div
        className={`bg-white border border-emerald-200 rounded-lg p-5 transition-all duration-300 ${
          isClosed 
            ? 'opacity-60 cursor-not-allowed pointer-events-none' 
            : 'hover:border-emerald-400 hover:shadow-md hover:-translate-y-0.5'
        }`}
      >
        <div className='flex items-start justify-between gap-4'>
          {/* Left Side */}
          <div className='flex-1 min-w-0'>
            <div className='flex items-start gap-3'>
              {ticket.priority === 'High' && (
                <AlertCircle className='w-5 h-5 text-red-500 shrink-0 mt-0.5' />
              )}
              <div className='flex-1 min-w-0'>
                <h2 className='text-lg font-semibold text-slate-900 group-hover:text-emerald-700 transition truncate'>
                  {ticket.subject}
                </h2>
                <p className='text-sm text-slate-600 mt-1'>
                  Department: <span className='text-slate-800 font-medium'>{ticket.issuerDepartment}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className='flex items-center gap-3 shrink-0'>
            <div className={`px-3 py-1 rounded-lg border text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
              {ticket.priority}
            </div>
            <div className={`px-3 py-1 rounded-lg text-xs font-semibold ${
              isClosed 
                ? 'bg-slate-100 text-slate-600 border border-slate-200' 
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}>
              {ticket.status}
            </div>
            <ChevronRight className={`w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition ${isClosed ? 'hidden' : ''}`} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TicketComponent;