import { useQuery } from '@tanstack/react-query';
import { fetchGoogleDriveCategories } from './googleDriveService';
import { projectsData as mockProjects } from '../mocks/projectsData';

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
  try {
    const categories = await fetchGoogleDriveCategories();
    const projects = categories.flatMap(category => 
      category.images.map((image: any) => ({
        id: image.id,
        title: image.title,
        description: image.description,
        image: image.image,
        thumbnailImage: image.thumbnailImage,
        technologies: image.technologies,
        link: image.link,
        number: image.number,
        createdTime: image.createdTime
      }))
    );
    return projects;
  } catch (error) {
    console.warn('Failed to fetch from Google Drive, using mock data:', error);
    return mockProjects;
  }
};

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    staleTime: 2 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
};