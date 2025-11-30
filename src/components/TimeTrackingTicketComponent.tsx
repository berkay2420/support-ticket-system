'use client';

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { finishTrackingTime } from "@/actions/tracking.actions";
import type { TimeTrackingTicket } from "@/generated/prisma/client";

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
      key={ticket.id}
      className={`flex justify-between items-center bg-white rounded-lg shadow border border-gray-200 p-6 ${
        isFinished ? "opacity-50" : ""
      }`}
    >
      <div>
        <h2 className="text-xl font-semibold text-blue-600">{ticket.description}</h2>
        <p className="text-sm text-gray-500">
          Started at: {new Date(ticket.startTime).toLocaleString()}
        </p>
        {isFinished && (
          <>
            <p className="text-sm text-gray-500">
              Finished at: {new Date(ticket.endTime!).toLocaleString()}
            </p>
            <p className="text-sm font-medium text-green-600">
              Worked: {formatWorkedTime(ticket.workedMinutes)}
            </p>
          </>
        )}
      </div>

      {!isFinished && (
        <form action={formAction}>
          <input type="hidden" name="ticketId" value={ticket.id} />
          <button
            type="submit"
            className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition"
          >
            Finish
          </button>
        </form>
      )}
    </div>
  );
};

export default TimeTrackingTicketComponent;