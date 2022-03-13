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


  ngAfterViewInit(): void {
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




  ngOnInit(): void {
    const fileToAnalyze = history.state.fileToAnalyze as File;

    if (fileToAnalyze.type === 'application/pdf') {
      this.convertService.convertPdfToImage(fileToAnalyze);
    }
    this.imageToTextService.convertImageToText(fileToAnalyze).then(text => {
      this.isFinished = true;
      this.textToAnalyze = text;
    });
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
