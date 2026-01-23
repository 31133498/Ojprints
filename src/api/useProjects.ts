import { useQuery } from '@tanstack/react-query';
import { fetchGoogleDriveCategories } from './googleDriveService';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  thumbnailImage?: string;
  technologies: string[];
  link?: string;
  number?: string;
  createdTime?: string;
}

const fetchProjects = async (): Promise<Project[]> => {
  const categories = await fetchGoogleDriveCategories();
  
  return categories.flatMap(category => 
    category.images.map((project: any) => ({
      ...project,
      thumbnailImage: project.thumbnailImage
    }))
  );
};

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    staleTime: 2 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
};