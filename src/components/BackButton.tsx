'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className='inline-flex items-center gap-2 text-slate-600 hover:text-emerald-700 mb-8 transition'
    >
      <ArrowLeft className='w-5 h-5' />
      Go Back
    </button>
  );
}