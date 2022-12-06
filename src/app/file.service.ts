import { Injectable } from '@angular/core';
import { Entry, File, FileError } from '@awesome-cordova-plugins/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  public constructor(private file: File) {
    return;
  }

  public async sslCertificates(): Promise<number> {
    const entries: Entry[] = await this.getDirContents('public/certificates');
    const sslCertificates: Entry[] = entries.filter((entry: Entry) => {
      return entry.name.includes('.cer');
    });
    return sslCertificates.length;
  }

  public async fileExists(path: string, filename: string): Promise<boolean> {
    return await this.file.checkFile(path, filename);
  }

  private async getDirContents(directory: string): Promise<Entry[]> {
    return await this.file.listDir(`${this.file.applicationDirectory}`, directory)
      .then((entries: Entry[]) => {
        return entries;
      })
      .catch((fileError: FileError) => {
        return [];
      });
  }
}

