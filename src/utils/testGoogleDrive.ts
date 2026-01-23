import { fetchGoogleDriveImages } from '../api/googleDriveService';
import '../utils/testFolderAccess';

export const testGoogleDriveIntegration = async () => {
  console.log('🔍 Testing Google Drive integration...');
  
  // First run the folder access test
  if ((window as any).testFolderAccess) {
    await (window as any).testFolderAccess();
  }
  
  try {
    const projects = await fetchGoogleDriveImages();
    
    if (projects.length === 0) {
      console.warn('⚠️ No images found in Google Drive folder');
      console.log('📁 Folder ID: 1Aquqwlf-wsV3RhXKSdMeoUYe4uP4J_05');
      console.log('🔗 Folder URL: https://drive.google.com/drive/folders/1Aquqwlf-wsV3RhXKSdMeoUYe4uP4J_05');
      console.log('💡 Make sure:');
      console.log('1. Folder is set to "Anyone with the link can view"');
      console.log('2. Folder contains image files');
      console.log('3. You are signed into the correct Google account');
      return;
    }
    
    console.log(`✅ Successfully loaded ${projects.length} images from Google Drive`);
    console.table(projects.map(p => ({
      title: p.title,
      technologies: p.technologies.join(', '),
      hasImage: !!p.image,
      hasThumbnail: !!p.thumbnailImage
    })));
    
  } catch (error) {
    console.error('❌ Google Drive integration test failed:', error);
  }
};

if (typeof window !== 'undefined') {
  (window as any).testGoogleDriveIntegration = testGoogleDriveIntegration;
}