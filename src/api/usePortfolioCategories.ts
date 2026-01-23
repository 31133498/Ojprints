import { useQuery } from '@tanstack/react-query';
import { fetchGoogleDriveCategories, DriveCategory } from './googleDriveService';

const fetchCategories = async (): Promise<DriveCategory[]> => {
  return await fetchGoogleDriveCategories();
};

export const usePortfolioCategories = () => {
  return useQuery({
    queryKey: ['portfolio-categories'],
    queryFn: fetchCategories,
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Auto-refetch every 1 minute
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};