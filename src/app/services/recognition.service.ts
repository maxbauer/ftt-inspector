import { Injectable } from '@angular/core';
import { ImageToTextService } from './image-to-text.service';
import { PdfToImageService } from './pdf-to-image.service';

@Injectable({
  providedIn: 'root'
})
export class RecognitionService {

  private filesToResutsMap = new Map<File, Promise<IRecognitionResult>>();

  constructor(private pdfToImageService: PdfToImageService, private imageToTextService: ImageToTextService) { }

  public runRecognition(files: File[]) {
    if (files) {
      files.forEach(async file => {
        let recognitionResultPromise;
        if (this.isImage(file)) {
          recognitionResultPromise = new Promise(async (resolve, reject) => {
            const conversionResult = await this.imageToTextService.convertImageToText(file);
            const result = {
              fileType: FileTypeEnum.image,
              image: file,
              rawText: conversionResult.text,
              wordsWithPosition: conversionResult.words,
            } as IRecognitionResult;
            resolve(result);
          });
        } else if (this.isPDF(file)) {
          recognitionResultPromise = new Promise(async (resolve, reject) => {
            const pdfAsIamge = await this.pdfToImageService.convertPdfToBase64Image(file);
            const conversionResult = await this.imageToTextService.convertImageToText(pdfAsIamge);
            const result = {
              fileType: FileTypeEnum.pdf,
              image: pdfAsIamge,
              rawText: conversionResult.text,
              wordsWithPosition: conversionResult.words,
            } as IRecognitionResult;
            resolve(result);
          });
        }
        this.filesToResutsMap.set(file, recognitionResultPromise);
      });
    }
  }

  public getResultForFile(file: File): Promise<IRecognitionResult> {
    return this.filesToResutsMap.get(file);
  }

  private isImage(fileToCheck: File): boolean {
    return fileToCheck.type === 'image/png' || fileToCheck.type === 'image/jpeg'
      || fileToCheck.type === 'image/jpg' || fileToCheck.type === 'image/webp';
  }

  private isPDF(fileToCheck: File): boolean {
    return fileToCheck.type === 'application/pdf';
  }

};

export enum FileTypeEnum {
  image,
  pdf,
  audio,
}

export interface IRecognitionResult {
  fileType: FileTypeEnum;
  image?: any;
  rawText: string;
  wordsWithPosition: any;
}
