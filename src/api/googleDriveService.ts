export interface DriveImage {
  id: string;
  name: string;
  webViewLink: string;
  webContentLink: string;
  thumbnailLink: string;
  mimeType: string;
  size: string;
  createdTime: string;
}

export interface DriveProject {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  thumbnailImage: string;
  technologies: string[];
  link?: string;
  createdTime: string;
}

const FOLDER_ID = '1Aquqwlf-wsV3RhXKSdMeoUYe4uP4J_05';
const API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY;

// Fallback descriptions and technologies for different image types
const getProjectMetadata = (fileName: string, index: number) => {
  const name = fileName.toLowerCase();
  
  if (name.includes('logo') || name.includes('brand')) {
    return {
      title: 'Brand Identity Design',
      description: 'Complete brand identity package including logo design, color palette, typography, and brand guidelines. Created using CorelDRAW with focus on ethical design principles.',
      technologies: ['CorelDRAW', 'Brand Identity', 'Logo Design']
    };
  } else if (name.includes('social') || name.includes('marketing')) {
    return {
      title: 'Digital Marketing Campaign',
      description: 'Comprehensive digital marketing visuals including social media graphics, web banners, and promotional materials designed for maximum engagement.',
      technologies: ['Adobe Photoshop', 'Digital Marketing', 'Social Media']
    };
  } else if (name.includes('print') || name.includes('flyer') || name.includes('brochure')) {
    return {
      title: 'Print Design Collection',
      description: 'Professional print materials including brochures, flyers, business cards, and posters with proper color management and typography.',
      technologies: ['CorelDRAW', 'Print Design', 'Typography']
    };
  } else if (name.includes('photo') || name.includes('edit')) {
    return {
      title: 'Photo Manipulation Art',
      description: 'Creative photo editing and manipulation projects showcasing advanced Photoshop techniques and artistic enhancement.',
      technologies: ['Adobe Photoshop', 'Photo Editing', 'Digital Art']
    };
  } else {
    return {
      title: `Creative Design Project ${index + 1}`,
      description: 'Professional graphic design work showcasing creative visual communication and ethical design principles.',
      technologies: ['CorelDRAW', 'Adobe Photoshop', 'Creative Design']
    };
  }
};

export const fetchGoogleDriveImages = async (): Promise<DriveProject[]> => {
  if (!API_KEY) {
    console.warn('Google Drive API key not found. Using fallback data.');
    return [];
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+(mimeType='image/jpeg'+or+mimeType='image/png'+or+mimeType='image/gif'+or+mimeType='image/webp')&fields=files(id,name,webViewLink,webContentLink,thumbnailLink,mimeType,size,createdTime)&orderBy=createdTime desc&key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Google Drive API error: ${response.status}`);
    }

    const data = await response.json();
    const images: DriveImage[] = data.files || [];

    return images.map((image, index) => {
      const metadata = getProjectMetadata(image.name, index);
      
      return {
        id: image.id,
        number: String(index + 1).padStart(2, '0'),
        title: metadata.title,
        description: metadata.description,
        image: `https://drive.google.com/uc?export=view&id=${image.id}`,
        thumbnailImage: image.thumbnailLink || `https://drive.google.com/uc?export=view&id=${image.id}`,
        technologies: metadata.technologies,
        link: image.webViewLink,
        createdTime: image.createdTime
      };
    });
  } catch (error) {
    console.error('Error fetching Google Drive images:', error);
    throw error;
  }
};