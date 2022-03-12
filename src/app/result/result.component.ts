import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    lang:"eng",
    oem: 1,
    psm: 3,
  };
  isFinished = false;
  tesseract = require("node-tesseract-ocr");

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.fileToAnalyze = history.state.fileToAnalyze as File;
    var promise = new Promise((resolve, reject) => {
      this.getBuffer(resolve);
    });
    promise.then((data) => {
      this.analyzeFile(data);
    })
  }

  async getBuffer(resolve){
    var reader = new FileReader();
    reader.readAsArrayBuffer(this.fileToAnalyze);  
    reader.onload = () => {
      var arrayBuffer = reader.result;
      resolve(arrayBuffer)
    }
  }

  async analyzeFile(fileToAnalyze) {
    console.log("[INFO] Start Analyzing file...")
    try{
      var uint8Array = new Uint8Array(fileToAnalyze);
      const text = await this.tesseract.recognize(uint8Array, this.config);
      console.log("Result: ", text);
      this.textToAnalyze = text
    }
    catch(error){
      console.log("[ERR]", error.message)
    }
    finally{
      this.isFinished = true;
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
}
