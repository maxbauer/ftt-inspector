import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageToTextService } from '../services/image-to-text.service';
import { OCROnImageService } from '../services/ocr-model-predict-on-image.service copy';
import { PdfToImageService } from '../services/pdf-to-image.service';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, AfterViewInit {

  fileToAnalyze: Blob;

  textToAnalyze: string;

  isFinished = false;

  constructor(private router: Router, private ocrService: OCROnImageService, private convertService: PdfToImageService, private imageToTextService: ImageToTextService) { }


  // ngAfterViewInit(): void {
  ngOnInit(): void {
    // const previewElement = document.getElementById("previewImg") as HTMLImageElement;
    // console.log("[DEBUG] filereader: ", document.getElementById('text-block'));
    // const fileReader = new FileReader();
    // fileReader.readAsDataURL(this.fileToAnalyze);
    // fileReader.onload = () => {
    //   let result = fileReader.result;
    //   console.log("[DEBUG] filereader: ", previewElement);
    //   previewElement.src = result.toString();
    //   let predictionResult = this.ocrService.predictOnImage(previewElement);
    // }
  }




  ngAfterViewInit(): void {
    const fileToAnalyze = history.state.fileToAnalyze as File;

    if (fileToAnalyze.type === 'application/pdf') {
      this.convertService.convertPdfToImage(fileToAnalyze);
    }
    this.showPreviewImage(fileToAnalyze);

    this.imageToTextService.convertImageToText(fileToAnalyze).then(data => {
      this.isFinished = true;
      this.textToAnalyze = data.text;
      // this.showPreviewImage(fileToAnalyze);
      this.createOverlay(data.words);
    });
  }

  createOverlay(words: any[]) {

    const previewElement = document.getElementById("previewImg") as HTMLImageElement;
    const realWidth = previewElement.naturalWidth;
    const width = previewElement.width;
    const factor = realWidth / width;

    const previewContainer = document.getElementById("preview-container") as HTMLDivElement;

    words.forEach(word => {
      const wordContainer = document.createElement('div') as HTMLDivElement;
      wordContainer.textContent = word.text;
      wordContainer.style.position = 'absolute';
      wordContainer.className = 'word-container'
      const boundingBox = word.bbox;
      wordContainer.style.top = boundingBox.y0 / factor + 'px';
      wordContainer.style.left = boundingBox.x0 / factor + 'px';
      wordContainer.style.width = (boundingBox.x1 - boundingBox.x0) / factor + 'px';
      wordContainer.style.height = (boundingBox.y1 - boundingBox.y0) / factor + 'px';
      wordContainer.style.backgroundColor = 'rgba(228, 205, 78, 0.438)';
      wordContainer.style.color = 'rgba(255, 255, 255, 0)';

      previewContainer.appendChild(wordContainer)
    })
  }


  showPreviewImage(imageToShow: File) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageToShow);
    fileReader.onload = () => {
      let result = fileReader.result;
      const previewElement = document.getElementById("previewImg") as HTMLImageElement;
      previewElement.src = result.toString();
    }
  }

  mark(event: Event) {
    const markValue = (event.target as HTMLInputElement).value;
    this.clearIt()
    if (markValue.length > 2) {
      let c = new RegExp(markValue, "ig")
      const wordContainers = document.getElementsByClassName('word-container');
      for (let index = 0; index < wordContainers.length; index++) {
        const element = wordContainers.item(index);
        element.innerHTML = element.innerHTML.replace(c, "<mark>" + markValue + "</mark>");
      }
    }
  }

  clearIt() {
    let b = new RegExp("mark>", "ig");
    const wordContainers = document.getElementsByClassName('word-container');
    for (let index = 0; index < wordContainers.length; index++) {
      const element = wordContainers.item(index);
      element.innerHTML = element.innerHTML.replace(b, "wbr>");
    }
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
