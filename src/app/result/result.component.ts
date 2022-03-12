import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Tesseract from 'tesseract.js';
import { createScheduler, createWorker } from 'tesseract.js';
import { PdfToImageService } from '../services/pdf-to-image.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  fileToAnalyze: Blob;
  searchTerm: String;
  textToAnalyze: string;

  config = {
    lang: "eng",
    oem: 1,
    psm: 3,
  };
  isFinished = false;

  constructor(private router: Router, private convetService: PdfToImageService) { }

  ngOnInit(): void {
    const fileToAnalyze = history.state.fileToAnalyze as File;

    if (fileToAnalyze.type === 'application/pdf') {
      this.convetService.convertPdfToImage(fileToAnalyze);
    }

    this.analyzeFile2(fileToAnalyze);
  }

  async analyzeFile2(file: File) {


    const t0 = performance.now();
    const scheduler = createScheduler();
    await this.createWorkers(1, scheduler);
    const t1 = performance.now();
    console.log(t1 - t0, 'milliseconds for worker creation');
    const { data: { text } } = await scheduler.addJob('recognize', file);
    const t2 = performance.now();
    console.log(t2 - t1, 'milliseconds for text recognition');

    this.textToAnalyze = text
    this.isFinished = true;
    await scheduler.terminate();
  }


  private async createWorkers(numberOfWorkers: number, scheduler: Tesseract.Scheduler) {
    for (let index = 0; index < numberOfWorkers; index++) {
      const worker = createWorker();
      await worker.load();
      await worker.loadLanguage('deu');
      await worker.initialize('deu', Tesseract.OEM.LSTM_ONLY);
      worker.setParameters({ tessedit_pageseg_mode: Tesseract.PSM.AUTO });
      scheduler.addWorker(worker);
    }
  }


  mark(event: Event) {
    const markValue = (event.target as HTMLInputElement).value;
    this.clearIt()
    if (markValue.length > 2) {
      let c = new RegExp(markValue, "ig")
      const main = document.getElementById('text-block');
      main.innerHTML = main.innerHTML.replace(c, "<mark>" + markValue + "</mark>");
    }
  }

  clearIt() {
    let b = new RegExp("mark>", "ig");
    const main = document.getElementById('text-block');
    main.innerHTML = main.innerHTML.replace(b, "wbr>");
  }

  exportFile() {
    this.saveData(this.textToAnalyze, "export.txt");
  }


  saveData = (function () {
    const a = document.createElement("a");
    return function (data, fileName) {
      const blob = new Blob([data], { type: "octet/stream" });
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    };
  }());
}
