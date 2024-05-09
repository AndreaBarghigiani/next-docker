// Components
import { CircleCheck } from 'lucide-react';

export const FormSuccess = ({ message }: { message?: string }) => {
  if (!message) return null;

  return (
    <div className='bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500'>
      <CircleCheck className='w-4 h-4' />
      <p>{message}</p>
    </div>
  );
};
