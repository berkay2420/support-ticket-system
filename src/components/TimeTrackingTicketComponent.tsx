'use client';

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { finishTrackingTime } from "@/actions/tracking.actions";
import type { TimeTrackingTicket } from "@/generated/prisma/client";
import { Clock, CheckCircle2 } from 'lucide-react';

type TimeTrackingTicketProps = {
  ticket: TimeTrackingTicket;
};

const formatWorkedTime = (minutes: number | null | undefined): string => {
  if (!minutes) return '';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

const TimeTrackingTicketComponent = ({ ticket }: TimeTrackingTicketProps) => {
  const isFinished = ticket.endTime !== null;
  
  const [state, formAction] = useActionState(
    finishTrackingTime,
    { success: false, message: '' }
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    } else if (state.message && state.message !== '') {
      toast.error(state.message);
    }
  }, [state.success]);

  return (
    <div
      className={`bg-white border border-emerald-200 rounded-lg p-6 transition-all duration-300 ${
        isFinished ? "opacity-60 pointer-events-none" : ""
      }`}
    >
      <div className='flex justify-between items-start gap-4'>
        {/* Left Side */}
        <div className='flex-1'>
          <div className='flex items-start gap-3'>
            <Clock className={`w-5 h-5 shrink-0 mt-1 ${isFinished ? 'text-emerald-600' : 'text-teal-600'}`} />
            <div>
              <h2 className="text-lg font-semibold text-slate-900">{ticket.description}</h2>
              
              <div className='mt-3 space-y-2'>
                <p className="text-sm text-slate-600">
                  Started: <span className='text-slate-800 font-medium'>{new Date(ticket.startTime).toLocaleString()}</span>
                </p>
                
                {isFinished && (
                  <>
                    <p className="text-sm text-slate-600">
                      Finished: <span className='text-slate-800 font-medium'>{new Date(ticket.endTime!).toLocaleString()}</span>
                    </p>
                    <div className='flex items-center gap-2 pt-2'>
                      <CheckCircle2 className='w-4 h-4 text-emerald-600' />
                      <p className="text-sm font-semibold text-emerald-700">
                        Worked For: {formatWorkedTime(ticket.workedMinutes)}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        {!isFinished && (
          <form action={formAction} className='shrink-0'>
            <input type="hidden" name="ticketId" value={ticket.id} />
            <button
              type="submit"
              className="bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-md whitespace-nowrap"
            >
              Finish
            </button>
          </form>
        )}

        {isFinished && (
          <div className='shrink-0 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg'>
            <p className='text-sm font-semibold text-emerald-700'>Completed</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeTrackingTicketComponent;
