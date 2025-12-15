export interface FileData {
  name: string;
  size: number; // in bytes
  type: string;
}

export enum UploadStatus {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}