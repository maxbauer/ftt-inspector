import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from '../core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  readonly allowedMimeTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

  selectedFiles = new Array<File>();
  dropZone: HTMLElement;

  constructor(private router: Router) { }


  ngAfterViewInit() {
    this.dropZone = document.getElementById('dnd-handler');

    this.dropZone.addEventListener('dragover', (e) => {
      e.stopPropagation();
      e.preventDefault();
    });

    this.dropZone.addEventListener('drop', (e) => {
      e.stopPropagation();
      e.preventDefault();

      const files = e.dataTransfer.files;
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if (file && this.allowedMimeTypes.includes(file.type)) {
          this.selectedFiles.push(file);
        }
      }
    });
  }

  onFileSelect(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      if (file && this.allowedMimeTypes.includes(file.type)) {
        this.selectedFiles.push(file);
      }
    }
  }


  startFTTInspector() {
    this.router.navigate(['result'], { state: { filesToAnalyze: this.selectedFiles } });
  }

}


