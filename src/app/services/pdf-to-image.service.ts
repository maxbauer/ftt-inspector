import { Injectable } from '@angular/core';
import { getDocument } from 'pdfjs-dist';

@Injectable({
  providedIn: 'root'
})
export class PdfToImageService {

  constructor() { }


  public async convertPdfToImage(imageFile: File) {

    const fileBuffer = new Promise((resolve, reject) => {
      this.fileToBuffer(imageFile, resolve);
    }) as any;
    const uint8Array = new Uint8Array(fileBuffer);

    // try {
    //   const pdfDocument = await getDocument(uint8Array).promise;
    //   console.log("pages", pdfDocument.numPages);

    //   const page = await pdfDocument.getPage(1);

    //   const viewport = page.getViewport({ scale: 1.0 });
    //   const canvasFactory = new NodeCanvasFactory();
    //   const canvasAndContext = canvasFactory.create(viewport.width, viewport.height);
    //   const renderContext = {
    //     canvasContext: canvasAndContext.context,
    //     viewport,
    //     canvasFactory,
    //   };

    //   const renderTask = page.render(renderContext);
    //   await renderTask.promise;
    //   page.cleanup();
    //   const image = canvasAndContext.canvas.toBuffer();
    //   return image;
    // } catch (reason) {
    //   console.log(reason);
    // }
  }

  private async fileToBuffer(file: File, resolve) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      resolve(reader.result);
    };
  }

}

// const Canvas = require("canvas");
// const assert = require("assert").strict;


// function NodeCanvasFactory() { }

// NodeCanvasFactory.prototype = {
//   create: function NodeCanvasFactory_create(width, height) {
//     assert(width > 0 && height > 0, "Invalid canvas size");
//     const canvas = Canvas.createCanvas(width, height);
//     const context = canvas.getContext("2d");
//     return {
//       canvas,
//       context,
//     };
//   },

//   reset: function NodeCanvasFactory_reset(canvasAndContext, width, height) {
//     assert(canvasAndContext.canvas, "Canvas is not specified");
//     assert(width > 0 && height > 0, "Invalid canvas size");
//     canvasAndContext.canvas.width = width;
//     canvasAndContext.canvas.height = height;
//   },

//   destroy: function NodeCanvasFactory_destroy(canvasAndContext) {
//     assert(canvasAndContext.canvas, "Canvas is not specified");

//     // Zeroing the width and height cause Firefox to release graphics
//     // resources immediately, which can greatly reduce memory consumption.
//     canvasAndContext.canvas.width = 0;
//     canvasAndContext.canvas.height = 0;
//     canvasAndContext.canvas = null;
//     canvasAndContext.context = null;
//   },
// };


