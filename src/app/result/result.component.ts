import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  isFinished = true;
  searchTerm: String;

  config = {
    lang:"eng",
    oem: 1,
    psm: 3,
  };
  tesseract = require("node-tesseract-ocr");


  constructor(private router: Router) { }

  ngOnInit(): void {
    const fileToAnalyze = history.state.fileToAnalyze as File;
    this.analyzeFile(fileToAnalyze);
  }

  async analyzeFile(fileToAnalyze: File) {
    console.log("[INFO] Start Analyzing file...")
    try{
      const text = await this.tesseract.recognize(File, this.config);
      console.log("Result: ", text);
    }
    catch(error){
      console.log(error.message)
    }
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    const searchTerm = filterValue.trim().toLowerCase();

  }


}
