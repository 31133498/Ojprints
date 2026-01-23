// Test folder access
export const testFolderAccess = async () => {
  const API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY;
  const FOLDER_ID = '1Aquqwlf-wsV3RhXKSdMeoUYe4uP4J_05';
  
  // Test 1: Check if folder exists and is accessible
  console.log('🔍 Testing folder access...');
  const folderUrl = `https://www.googleapis.com/drive/v3/files/${FOLDER_ID}?key=${API_KEY}&fields=id,name,permissions`;
  
  try {
    const folderResponse = await fetch(folderUrl);
    console.log('📁 Folder response:', folderResponse.status);
    
    if (folderResponse.ok) {
      const folderData = await folderResponse.json();
      console.log('📁 Folder data:', folderData);
    } else {
      const errorText = await folderResponse.text();
      console.error('❌ Folder error:', errorText);
    }
  } catch (error) {
    console.error('❌ Folder test failed:', error);
  }
  
  // Test 2: List all files (no filtering)
  console.log('🔍 Testing file listing...');
  const filesUrl = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType,parents,webViewLink)`;
  
  try {
    const filesResponse = await fetch(filesUrl);
    console.log('📄 Files response:', filesResponse.status);
    
    if (filesResponse.ok) {
      const filesData = await filesResponse.json();
      console.log('📄 All files in folder:', filesData);
    } else {
      const errorText = await filesResponse.text();
      console.error('❌ Files error:', errorText);
    }
  } catch (error) {
    console.error('❌ Files test failed:', error);
  }
};

// Make it available globally
if (typeof window !== 'undefined') {
  (window as any).testFolderAccess = testFolderAccess;
}