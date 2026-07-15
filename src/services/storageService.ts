// src/services/storageService.ts
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';

export async function uploadAvatar(uid: string, file: File): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('O arquivo deve ser uma imagem');
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error('A imagem deve ter no máximo 5MB');
  }

  const storageRef = ref(storage, `avatars/${uid}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);

  return downloadURL;
}

export async function deleteAvatar(uid: string): Promise<void> {
  const storageRef = ref(storage, `avatars/${uid}`);
  try {
    await deleteObject(storageRef);
  } catch (error) {
    if ((error as any).code === 'storage/object-not-found') {
      return;
    }
    console.error('Erro ao deletar avatar:', error);
    throw error;
  }
}

export async function getAvatarUrl(uid: string): Promise<string | null> {
  const storageRef = ref(storage, `avatars/${uid}`);
  try {
    return await getDownloadURL(storageRef);
  } catch (error) {
    if ((error as any).code === 'storage/object-not-found') {
      return null;
    }
    throw error;
  }
}