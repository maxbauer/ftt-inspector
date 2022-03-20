import { Injectable } from '@angular/core';
import * as Tesseract from 'tesseract.js';
import { createScheduler, createWorker } from 'tesseract.js';

@Injectable({
  providedIn: 'root'
})
export class ImageToTextService {

  scheduler: Tesseract.Scheduler;
  workerCreationPromise: Promise<void>;

  constructor() {
    this.scheduler = createScheduler();
    this.workerCreationPromise = this.createWorkers(2);
  }


  public async convertImageToText(imageFile: Tesseract.ImageLike) {
    await this.workerCreationPromise;
    const result = await this.scheduler.addJob('recognize', imageFile);
    // console.log(result.data.words);
    // await this.scheduler.terminate(); // not sure if we need this
    return result.data;
  }


  private async createWorkers(numberOfWorkers: number) {
    for (let index = 0; index < numberOfWorkers; index++) {
      const worker = createWorker();
      await worker.load();
      await worker.loadLanguage('deu');
      await worker.initialize('deu', Tesseract.OEM.LSTM_ONLY);
      // worker.setParameters({ tessedit_pageseg_mode: Tesseract.PSM.AUTO });
      this.scheduler.addWorker(worker);
    }
  }

}



