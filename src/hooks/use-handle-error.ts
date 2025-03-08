import { handleError } from '@/helpers';
import { useAppStore } from '@/stores';

export const useHandleError = () => {
  const { setGlobal } = useAppStore();
  return (error: any) => {
    setGlobal({
      test: 'error',
    });
    handleError(error);
  };
};
