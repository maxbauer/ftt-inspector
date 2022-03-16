import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from '../core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  selectedFile: File;
  fileUrl: string;
  fileName: string;

  dropZone: HTMLElement;

  constructor(private router: Router, private electronServie: ElectronService) { }

  ngOnInit(): void {
    console.log('HomeComponent INIT');

  }

  ngAfterViewInit() {
    this.dropZone = document.getElementById('dnd-handler');

    this.dropZone.addEventListener('dragover', (e) => {
      e.stopPropagation();
      e.preventDefault();
    });

    this.dropZone.addEventListener('drop', (e) => {
      e.stopPropagation();
      e.preventDefault();

      console.log(e);
      const files = e.dataTransfer.files;
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        this.selectedFile = file;
        this.fileName = file.name;
      }
    });
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
    this.router.navigate(['result'], { state: { fileToAnalyze: this.selectedFile } });
  }

}


