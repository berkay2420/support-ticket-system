import { getCurrentUser } from "@/lib/current-user";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, AlertCircle, Calendar, Clock, CheckCircle2, User as UserIcon } from 'lucide-react';
import { getTimeTrackingById } from "@/actions/tracking.actions";
import BackButton from "@/components/BackButton";

const TimeTrackingDetailsPage = async (props: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await props.params;
  const user = await getCurrentUser();

  if (!user) {
    notFound();
  }

  const timeTracking = await getTimeTrackingById(id);

  if (!timeTracking) {
    return (
      <div className='min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50 p-8 flex items-center justify-center'>
        <div className='bg-white border border-emerald-200 rounded-lg p-8 text-center max-w-md shadow-sm'>
          <AlertCircle className='w-12 h-12 text-red-500 mx-auto mb-4' />
          <h2 className='text-2xl font-bold text-emerald-900 mb-2'>Time Tracking Not Found</h2>
          <p className='text-slate-600 mb-6'>The time tracking record you're looking for doesn't exist</p>
          <Link
            href='/'
            className='inline-flex items-center gap-2 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-md'
          >
            <ArrowLeft className='w-5 h-5' />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const isFinished = timeTracking.endTime !== null;
  
  const formatWorkedTime = (minutes: number | null | undefined): string => {
    if (!minutes) return '0h 0m';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getStatusColor = (finished: boolean) => {
    return finished
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : 'bg-amber-50 text-amber-700 border-amber-200';
  };

  return (
    <div className='min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50 p-8'>
      <div className='max-w-3xl mx-auto'>
        {/* Back Button */}
        <BackButton />
        
        {/* Main Card */}
        <div className='bg-white border border-emerald-200 rounded-lg p-8 space-y-8 shadow-sm'>
          {/* Header */}
          <div className='border-b border-emerald-100 pb-6'>
            <div className='flex items-start justify-between gap-4 mb-4'>
              <div className='flex-1'>
                <div className='flex items-center gap-3 mb-3'>
                  <Clock className='w-6 h-6 text-emerald-600' />
                  <h1 className='text-4xl font-bold text-emerald-900'>{timeTracking.description}</h1>
                </div>
                <div className='flex items-center gap-3'>
                  <span className={`px-3 py-1 rounded-lg border text-sm font-semibold ${getStatusColor(isFinished)}`}>
                    {isFinished ? 'Completed' : 'In Progress'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Section */}
          {isFinished && (
            <div className='bg-emerald-50 border border-emerald-200 rounded-lg p-6'>
              <div className='flex items-center gap-3 mb-4'>
                <CheckCircle2 className='w-6 h-6 text-emerald-600' />
                <h2 className='text-lg font-semibold text-emerald-900'>Time Summary</h2>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='bg-white border border-emerald-200 rounded-lg p-4'>
                  <p className='text-sm text-slate-600 mb-1'>Total Time Worked</p>
                  <p className='text-3xl font-bold text-emerald-700'>{formatWorkedTime(timeTracking.workedMinutes)}</p>
                </div>
                <div className='bg-white border border-emerald-200 rounded-lg p-4'>
                  <p className='text-sm text-slate-600 mb-1'>Minutes</p>
                  <p className='text-3xl font-bold text-emerald-700'>{timeTracking.workedMinutes ?? 0}</p>
                </div>
                <div className='bg-white border border-emerald-200 rounded-lg p-4'>
                  <p className='text-sm text-slate-600 mb-1'>Hours</p>
                  <p className='text-3xl font-bold text-emerald-700'>{((timeTracking.workedMinutes ?? 0) / 60).toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Started At */}
            <div>
              <div className='flex items-center gap-2 mb-3'>
                <Calendar className='w-5 h-5 text-emerald-600' />
                <h3 className='text-sm font-semibold text-slate-700'>Started</h3>
              </div>
              <p className='text-lg text-emerald-900 font-medium'>{new Date(timeTracking.startTime).toLocaleString()}</p>
            </div>

            {/* Finished At */}
            {isFinished && (
              <div>
                <div className='flex items-center gap-2 mb-3'>
                  <Calendar className='w-5 h-5 text-emerald-600' />
                  <h3 className='text-sm font-semibold text-slate-700'>Finished</h3>
                </div>
                <p className='text-lg text-emerald-900 font-medium'>{new Date(timeTracking.endTime!).toLocaleString()}</p>
              </div>
            )}
          </div>

          {/* Duration Info */}
          <div className='border-t border-emerald-100 pt-6 bg-slate-50 rounded-lg p-6'>
            <div className='flex items-center gap-3 mb-3'>
              <Clock className='w-5 h-5 text-teal-600' />
              <h3 className='text-lg font-semibold text-slate-900'>Duration</h3>
            </div>
            <div className='space-y-2'>
              <p className='text-slate-700'>
                Started: <span className='font-semibold text-slate-900'>{new Date(timeTracking.startTime).toLocaleTimeString()}</span>
              </p>
              {isFinished && (
                <>
                  <p className='text-slate-700'>
                    Finished: <span className='font-semibold text-slate-900'>{new Date(timeTracking.endTime!).toLocaleTimeString()}</span>
                  </p>
                  <p className='text-slate-700 pt-2'>
                    Total Duration: <span className='font-semibold text-emerald-700 text-lg'>{formatWorkedTime(timeTracking.workedMinutes)}</span>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTrackingDetailsPage;