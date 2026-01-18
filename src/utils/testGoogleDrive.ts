import { fetchGoogleDriveImages } from '../api/googleDriveService';

export const testGoogleDriveIntegration = async () => {
  console.log('🔍 Testing Google Drive integration...');
  
  try {
    const projects = await fetchGoogleDriveImages();
    
    if (projects.length === 0) {
      console.warn('⚠️ No images found in Google Drive folder');
      console.log('📁 Folder ID: 1Aquqwlf-wsV3RhXKSdMeoUYe4uP4J_05');
      console.log('🔗 Folder URL: https://drive.google.com/drive/folders/1Aquqwlf-wsV3RhXKSdMeoUYe4uP4J_05');
      return;
    }
    
    console.log(`✅ Successfully loaded ${projects.length} images from Google Drive`);
    console.table(projects.map(p => ({
      title: p.title,
      technologies: p.technologies.join(', '),
      hasImage: !!p.image,
      hasThumbnail: !!p.thumbnailImage
    })));
    
    const firstProject = projects[0];
    console.log('🖼️ Testing first image load...');
    
    const img = new Image();
    img.onload = () => {
      console.log(`✅ Image loaded successfully: ${firstProject.title}`);
      console.log(`📐 Dimensions: ${img.width}x${img.height}`);
    };
    img.onerror = () => {
      console.error(`❌ Failed to load image: ${firstProject.title}`);
    };
    img.src = firstProject.image;
    
  } catch (error) {
    console.error('❌ Google Drive integration test failed:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        console.log('💡 Make sure to set VITE_GOOGLE_DRIVE_API_KEY in your .env file');
      } else if (error.message.includes('403')) {
        console.log('💡 Check that Google Drive API is enabled and API key has proper permissions');
      } else if (error.message.includes('404')) {
        console.log('💡 Verify the folder ID and that the folder is publicly accessible');
      }
    }
  }
};

if (typeof window !== 'undefined') {
  (window as any).testGoogleDriveIntegration = testGoogleDriveIntegration;
}