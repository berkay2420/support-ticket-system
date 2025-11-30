'use client';

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { finishTrackingTime } from "@/actions/tracking.actions";
import type { TimeTrackingTicket } from "@/generated/prisma/client";

type TimeTrackingTicketProps = {
  ticket: TimeTrackingTicket;
};

const TimeTrackingTicketComponent = ({ ticket }: TimeTrackingTicketProps) => {
  const [endTime, setEndTime] = useState<Date | null>(ticket.endTime ? new Date(ticket.endTime) : null);
  const isFinished = endTime !== null;
  
  const [state, formAction] = useActionState(
    finishTrackingTime,
    { success: false, message: '' }
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      setEndTime(new Date());
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

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
          <p className="text-sm text-gray-500">
            Finished at: {endTime.toLocaleString()}
          </p>
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