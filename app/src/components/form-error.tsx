// Components
import { TriangleAlert } from 'lucide-react';

export const FormError = ({ message }: { message?: string }) => {
  if (!message) return null;

  return (
    <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive'>
      <TriangleAlert className='w-4 h-4' />
      <p>{message}</p>
    </div>
  );
};
