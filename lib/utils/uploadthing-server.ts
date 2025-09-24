import { UTApi } from "uploadthing/server";

// Create UploadThing API instance
const utapi = new UTApi();

/**
 * Upload a file to UploadThing from a File object
 * @param file - The File object to upload
 * @param fileName - Optional custom filename
 * @returns Upload result with file URL and key
 */
export async function uploadFileToUT(
  file: File,
  fileName?: string
): Promise<{ url: string; key: string; name: string; size: number }> {
  try {
    console.log(fileName);

    const response = await utapi.uploadFiles(file);

    if (response.error) {
      throw new Error(`Upload failed: ${response.error.message}`);
    }

    return {
      url: response.data.url,
      key: response.data.key,
      name: response.data.name,
      size: response.data.size,
    };
  } catch (error) {
    console.error("UploadThing upload error:", error);
    throw new Error("Failed to upload file to UploadThing");
  }
}

/**
 * Upload multiple files to UploadThing
 * @param files - Array of File objects to upload
 * @returns Array of upload results
 */
export async function uploadMultipleFilesToUT(
  files: File[]
): Promise<Array<{ url: string; key: string; name: string; size: number }>> {
  try {
    const response = await utapi.uploadFiles(files);

    if (!Array.isArray(response)) {
      throw new Error("Unexpected response format for multiple file upload");
    }

    const results = [];
    for (const result of response) {
      if (result.error) {
        throw new Error(`Upload failed: ${result.error.message}`);
      }
      results.push({
        url: result.data.url,
        key: result.data.key,
        name: result.data.name,
        size: result.data.size,
      });
    }

    return results;
  } catch (error) {
    console.error("UploadThing multiple upload error:", error);
    throw new Error("Failed to upload files to UploadThing");
  }
}

/**
 * Delete a file from UploadThing using its key
 * @param fileKey - The file key to delete
 * @returns Success status
 */
export async function deleteFileFromUT(fileKey: string): Promise<boolean> {
  try {
    await utapi.deleteFiles(fileKey);
    return true;
  } catch (error) {
    console.error("UploadThing delete error:", error);
    throw new Error("Failed to delete file from UploadThing");
  }
}

/**
 * Delete multiple files from UploadThing using their keys
 * @param fileKeys - Array of file keys to delete
 * @returns Success status
 */
export async function deleteMultipleFilesFromUT(
  fileKeys: string[]
): Promise<boolean> {
  try {
    await utapi.deleteFiles(fileKeys);
    return true;
  } catch (error) {
    console.error("UploadThing multiple delete error:", error);
    throw new Error("Failed to delete files from UploadThing");
  }
}

/**
 * Extract file from FormData and validate it exists
 * @param formData - The FormData object
 * @param fieldName - The field name containing the file
 * @returns File object or null if not found
 */
export function extractFileFromFormData(
  formData: FormData,
  fieldName: string
): File | null {
  const file = formData.get(fieldName);

  if (!file || typeof file === "string") {
    return null;
  }

  if (!(file instanceof File)) {
    return null;
  }

  return file;
}

/**
 * Extract multiple files from FormData
 * @param formData - The FormData object
 * @param fieldName - The field name containing the files
 * @returns Array of File objects
 */
export function extractMultipleFilesFromFormData(
  formData: FormData,
  fieldName: string
): File[] {
  const files = formData.getAll(fieldName);

  return files.filter(
    (file): file is File => file instanceof File && typeof file !== "string"
  );
}
