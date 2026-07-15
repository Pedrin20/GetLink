export async function uploadAvatar(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'avatar_upload');
  formData.append('cloud_name', 'seu_cloud_name');

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/seu_cloud_name/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Erro no upload');
    }

    const data = await response.json();
    return data.secure_url; // URL da imagem
  } catch (error) {
    console.error('❌ Erro no upload para Cloudinary:', error);
    throw error;
  }
}