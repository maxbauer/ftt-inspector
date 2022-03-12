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
  isFinished = true;
  tesseract = require("node-tesseract-ocr");

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.fileToAnalyze = history.state.fileToAnalyze as File;
    var promise = new Promise(this.getBuffer);
    promise.then( function (data){
      this.analyzeFile(data);
    })
  }

  async getBuffer(resolve){
    var reader = new FileReader();
    reader.readAsArrayBuffer(this.fileToAnalyze);  
    reader.onload = function(){
      var arrayBuffer = reader.result;
      resolve(arrayBuffer)
    }
  }

  async analyzeFile(fileToAnalyze: Buffer) {
    console.log("[INFO] Start Analyzing file...")
    try{
      const text = await this.tesseract.recognize(File, this.config);
      console.log("Result: ", text);
    }
    catch(error){
      console.log(error.message)
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
