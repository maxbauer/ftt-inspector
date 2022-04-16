import { Injectable } from '@angular/core';
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');
const pdfjsWorker = require('pdfjs-dist/build/pdf.worker.entry');

// https://github.com/mozilla/pdf.js/blob/master/examples/node/pdf2png/pdf2png.js

@Injectable({
  providedIn: 'root'
})
export class PdfToImageService {

  constructor() {
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  }


  public async convertPdfToBase64Image(imageFile: File): Promise<string> {

    const fileBuffer = await new Promise((resolve, reject) => {
      this.fileToBuffer(imageFile, resolve);
    }) as any;

    const uint8Array = new Uint8Array(fileBuffer);

    try {
      const pdfDocument = await pdfjsLib.getDocument(uint8Array).promise;

      const pages = new Array<IRenderedPage>();

      for (let pageIndex = 1; pageIndex < pdfDocument.numPages + 1; pageIndex++) {
        const page = await pdfDocument.getPage(pageIndex);
        const viewport = page.getViewport({ scale: 1.0 });

        const canvasFactory = new nodeCanvasFactory();
        const canvasAndContext = canvasFactory.create(
          viewport.width,
          viewport.height
        );
        const renderContext = {
          canvasContext: canvasAndContext.context,
          viewport,
          canvasFactory,
        };

        const renderTask = page.render(renderContext);
        await renderTask.promise;

        const pageImageData = canvasAndContext.context.getImageData(0, 0, viewport.width, viewport.height);
        pages.push({ imageData: pageImageData, width: viewport.width, height: viewport.height });

        page.cleanup();
      }

      const resultCanvasHeight = pages.reduce((previousHeight, page) => previousHeight + page.height, 0);
      const resultCanvasWidth = pages.reduce((previousWidth, page) => page.width > previousWidth ? page.width : previousWidth, 0);

      const resultCanvas = document.createElement('canvas') as HTMLCanvasElement;
      resultCanvas.width = resultCanvasWidth;
      resultCanvas.height = resultCanvasHeight;
      const resultContext = resultCanvas.getContext('2d');

      let lastPageY = 0;
      pages.forEach(page => {
        resultContext.putImageData(page.imageData, 0, lastPageY);
        lastPageY += page.height + 1;
      });

      const pdfAsBase64 = await resultCanvas.toDataURL('image/jpg');

      return pdfAsBase64;
    } catch (reason) {
      console.log(reason);
    }
  }


  private async fileToBuffer(file: File, resolve) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      resolve(reader.result);
    };
  }

}

interface IRenderedPage {
  imageData: ImageData;
  width: number;
  height: number;
}


function nodeCanvasFactory() { }
nodeCanvasFactory.prototype = {
  create: function nodeCanvasFactoryCreate(width, height): { canvas: HTMLCanvasElement; context: CanvasRenderingContext2D } {
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    canvas.width = width;
    canvas.height = height;
    return {
      canvas,
      context: canvas.getContext('2d'),
    };
  },

  reset: function nodeCanvasFactoryReset(canvasAndContext, width, height) {
    canvasAndContext.canvas.width = width;
    canvasAndContext.canvas.height = height;
  },

  destroy: function nodeCanvasFactoryDestroy(canvasAndContext) {
    // Zeroing the width and height cause Firefox to release graphics
    // resources immediately, which can greatly reduce memory consumption.
    canvasAndContext.canvas.width = 0;
    canvasAndContext.canvas.height = 0;
    canvasAndContext.canvas = null;
    canvasAndContext.context = null;
  },
};
