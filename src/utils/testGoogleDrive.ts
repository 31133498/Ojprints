import { fetchGoogleDriveCategories } from '../api/googleDriveService';
import '../utils/testFolderAccess';

export const testGoogleDriveIntegration = async () => {
  console.log('🔍 Testing Google Drive integration...');
  
  if ((window as any).testFolderAccess) {
    await (window as any).testFolderAccess();
  }
  
  try {
    const categories = await fetchGoogleDriveCategories();
    
    if (categories.length === 0) {
      console.warn('⚠️ No categories found in Google Drive folder');
      console.log('📁 Folder ID: 1Aquqwlf-wsV3RhXKSdMeoUYe4uP4J_05');
      console.log('🔗 Folder URL: https://drive.google.com/drive/folders/1Aquqwlf-wsV3RhXKSdMeoUYe4uP4J_05');
      console.log('💡 Make sure:');
      console.log('1. Folder is set to "Anyone with the link can view"');
      console.log('2. Folder contains image files');
      console.log('3. You are signed into the correct Google account');
      return;
    }
    
    const totalImages = categories.reduce((sum, cat) => sum + cat.count, 0);
    console.log(`✅ Successfully loaded ${categories.length} categories with ${totalImages} total images`);
    console.table(categories.map((cat: any) => ({
      name: cat.name,
      count: cat.count,
      hasImages: cat.images.length > 0
    })));
    
  } catch (error) {
    console.error('❌ Google Drive integration test failed:', error);
  }
};

if (typeof window !== 'undefined') {
  (window as any).testGoogleDriveIntegration = testGoogleDriveIntegration;
}