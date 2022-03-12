import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileWatcherEventKind } from 'typescript/lib/tsserverlibrary';
import { OCROnImageService } from '../services/ocr-model-predict-on-image.service copy';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, AfterViewInit {

  fileToAnalyze: Blob;
  searchTerm: String;
  textToAnalyze: string;



  config = {
    lang: "eng",
    oem: 1,
    psm: 3,
  };
  isFinished = true;

  constructor(private router: Router, private ocrService: OCROnImageService) { }


  ngAfterViewInit(): void {
    const previewElement = document.getElementById("previewImg") as HTMLImageElement;
    console.log("[DEBUG] filereader: ", document.getElementById('text-block'));
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.fileToAnalyze);
    fileReader.onload = () => {
      let result = fileReader.result;
      console.log("[DEBUG] filereader: ", previewElement);
      previewElement.src = result.toString();
      let predictionResult = this.ocrService.predictOnImage(previewElement);
    }
  }

  ngOnInit(): void {
    this.fileToAnalyze = history.state.fileToAnalyze as File;
  }



  async getBuffer(resolve) {
    var reader = new FileReader();
    reader.readAsArrayBuffer(this.fileToAnalyze);
    reader.onload = () => {
      var arrayBuffer = reader.result;
      resolve(arrayBuffer)
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
