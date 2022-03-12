import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { exec } from "child_process"
//import { recognize } from 'node-tesseract-ocr'

const tesseract = require("node-tesseract-ocr");

const config = {
  lang:"eng",
  oem: 1,
  psm: 3,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  selectedFile: File;
  fileUrl: string;
  fileName: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('HomeComponent INIT');
    //`tesseract --psm 12 --oem 2 -l chi_tra ${'assets/plaid_c150.jpeg'}`
  }



  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file.type);

    const allowedMimeTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (file && allowedMimeTypes.includes(file.type)) {
      this.selectedFile = file;
      this.fileName = file.name;
    }
  }


  startFTTInspector() {
    this.router.navigate(['result'], {  state: { fileToAnalyze: this.selectedFile} });
  }

}


