'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
import { deleteUser } from '@/actions/admin.actions';
import { useRouter } from 'next/navigation';

interface DeleteEmployeeButtonProps {
  userId: string;
}

export default function DeleteEmployeeButton({ userId }: DeleteEmployeeButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this employee?')) return;

    setIsLoading(true);
    try {
      const result = await deleteUser(userId);
      
      if (result.success) {
        toast.success(result.message);
        router.push('/admin');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Failed to delete employee');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isLoading}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
        isLoading
          ? 'bg-red-100 text-red-500 cursor-not-allowed opacity-60'
          : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
      }`}
    >
      <Trash2 className='w-5 h-5' />
      <span>{isLoading ? 'Deleting...' : 'Delete Employee'}</span>
    </button>
  );
}