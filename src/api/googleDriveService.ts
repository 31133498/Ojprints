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
  name: string;
  title: string;
  description: string;
  image: string;
  thumbnailImage: string;
  technologies: string[];
  link?: string;
  category: string;
}

export interface DriveCategory {
  id: string;
  name: string;
  count: number;
  images: DriveProject[];
  icon: string;
}

const FOLDER_ID = '1Aquqwlf-wsV3RhXKSdMeoUYe4uP4J_05';
const API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY;

const getCategoryIcon = (folderName: string): string => {
  const name = folderName.toLowerCase();
  if (name.includes('logo')) return 'badge';
  if (name.includes('flyer')) return 'description';
  if (name.includes('banner')) return 'flag';
  if (name.includes('business card')) return 'contact_page';
  if (name.includes('birthday')) return 'cake';
  if (name.includes('church')) return 'church';
  if (name.includes('mock')) return 'preview';
  if (name.includes('invoice') || name.includes('receipt')) return 'receipt';
  if (name.includes('sticker')) return 'label';
  if (name.includes('access card')) return 'badge';
  if (name.includes('roll up')) return 'vertical_align_center';
  if (name.includes('envelope')) return 'mail';
  if (name.includes('pamphlet')) return 'menu_book';
  return 'design_services';
};

const getCategoryMetadata = (folderName: string) => {
  const name = folderName.toLowerCase();
  if (name.includes('logo')) return {
    title: 'Logo Design',
    description: 'Professional logo designs and brand identity solutions',
    technologies: ['CorelDRAW', 'Brand Identity', 'Logo Design']
  };
  if (name.includes('flyer')) return {
    title: 'Flyer Design',
    description: 'Eye-catching flyers and promotional materials',
    technologies: ['CorelDRAW', 'Print Design', 'Marketing']
  };
  if (name.includes('banner')) return {
    title: 'Banner Design',
    description: 'Large format banners and display graphics',
    technologies: ['CorelDRAW', 'Large Format', 'Display']
  };
  if (name.includes('business card')) return {
    title: 'Business Cards',
    description: 'Professional business card designs',
    technologies: ['CorelDRAW', 'Print Design', 'Branding']
  };
  if (name.includes('birthday')) return {
    title: 'Birthday Designs',
    description: 'Celebration and birthday-themed designs',
    technologies: ['CorelDRAW', 'Event Design', 'Celebration']
  };
  return {
    title: folderName.replace(/DESIGN|FLYER|BANNER/gi, '').trim(),
    description: `Professional ${folderName.toLowerCase()} designs and graphics`,
    technologies: ['CorelDRAW', 'Graphic Design', 'Creative']
  };
};

export const fetchGoogleDriveCategories = async (): Promise<DriveCategory[]> => {
  if (!API_KEY) {
    throw new Error('Google Drive API key is required');
  }

  const foldersUrl = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+mimeType='application/vnd.google-apps.folder'&key=${API_KEY}&fields=files(id,name)`;
  
  const foldersResponse = await fetch(foldersUrl);
  if (!foldersResponse.ok) {
    throw new Error(`Google Drive API error: ${foldersResponse.status}`);
  }

  const foldersData = await foldersResponse.json();
  const subfolders = foldersData.files || [];
  
  const categories: DriveCategory[] = [];
  
  for (const folder of subfolders) {
    const imagesUrl = `https://www.googleapis.com/drive/v3/files?q='${folder.id}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType,webViewLink,thumbnailLink)`;
    
    console.log(`Fetching images from ${folder.name}...`);
    const imagesResponse = await fetch(imagesUrl);
    if (imagesResponse.ok) {
      const imagesData = await imagesResponse.json();
      const allFiles = imagesData.files || [];
      console.log(`${folder.name}: Found ${allFiles.length} total files`);
      
      const folderImages = allFiles.filter((file: any) => 
        file.mimeType && file.mimeType.startsWith('image/')
      );
      console.log(`${folder.name}: ${folderImages.length} image files`);
      
      if (folderImages.length > 0) {
        const metadata = getCategoryMetadata(folder.name);
        
        const projects: DriveProject[] = folderImages.map((image: any) => ({
          id: image.id,
          name: image.name,
          title: metadata.title,
          description: metadata.description,
          image: `https://drive.google.com/thumbnail?id=${image.id}&sz=w1200`,
          thumbnailImage: `https://drive.google.com/thumbnail?id=${image.id}&sz=w400`,
          technologies: metadata.technologies,
          link: image.webViewLink,
          category: folder.name
        }));
        
        categories.push({
          id: folder.id,
          name: folder.name,
          count: folderImages.length,
          images: projects,
          icon: getCategoryIcon(folder.name)
        });
      }
    }
  }
  
  console.log('Total categories:', categories.length);
  console.log('Total images:', categories.reduce((sum, cat) => sum + cat.count, 0));
  return categories.sort((a, b) => b.count - a.count);
};