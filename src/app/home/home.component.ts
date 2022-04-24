import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  readonly allowedMimeTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

  selectedFiles = new Array<File>();
  dropZone: HTMLElement;

  constructor(private router: Router, public utilityService: UtilityService) { }


  ngAfterViewInit() {
    this.dropZone = document.getElementById('dnd-handler');

    this.dropZone.addEventListener('dragover', (e) => {
      e.stopPropagation();
      e.preventDefault();
    });

    this.dropZone.addEventListener('drop', (e) => {
      e.stopPropagation();
      e.preventDefault();

      const files = Array.from(e.dataTransfer.files);
      for (const file of files) {
        if (file && this.allowedMimeTypes.includes(file.type)) {
          this.selectedFiles.push(file);
        }
      }
    });
  }

  onFileSelect(event: Event) {
    const files = Array.from((event.target as HTMLInputElement).files);
    for (const file of files) {
      if (file && this.allowedMimeTypes.includes(file.type)) {
        this.selectedFiles.push(file);
      }
    }
  }

  public triggerUpload(): void {
    const fileInput = document.getElementById('upload-input') as HTMLInputElement;
    fileInput.click();
  }

  public removeSelectedFile(fileIndex: number): void {
    this.selectedFiles.splice(fileIndex, 1);

  }


  startFTTInspector() {
    this.router.navigate(['result'], { state: { filesToAnalyze: this.selectedFiles } });
  }

}


