import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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


