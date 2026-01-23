import { useQuery } from '@tanstack/react-query';
import { projectsData } from '../mocks/projectsData';
import { fetchGoogleDriveImages } from './googleDriveService';

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
  const driveProjects = await fetchGoogleDriveImages();
  
  return driveProjects.map(project => ({
    ...project,
    thumbnailImage: project.thumbnailImage
  }));
};

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    staleTime: 2 * 60 * 1000, // 2 minutes for more frequent updates
    refetchInterval: 5 * 60 * 1000, // Auto-refetch every 5 minutes
  });
};