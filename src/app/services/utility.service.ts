import { Injectable } from '@angular/core';
import * as Tesseract from 'tesseract.js';
import { createScheduler, createWorker } from 'tesseract.js';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {


  constructor() { }


  public isElectron(): boolean {

    // Renderer process
    if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
      return true;
    }

    // Main process
    if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
      return true;
    }

    // Detect the user agent when the `nodeIntegration` option is set to true
    if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
      return true;
    }

    return false;
  }

  public isImage(fileToCheck: File): boolean {
    return fileToCheck.type === 'image/png' || fileToCheck.type === 'image/jpeg'
      || fileToCheck.type === 'image/jpg' || fileToCheck.type === 'image/webp';
  }

  public isPDF(fileToCheck: File): boolean {
    return fileToCheck.type === 'application/pdf';
  }

}



