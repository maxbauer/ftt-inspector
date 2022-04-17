import { Component, OnInit } from '@angular/core';
import { RecognitionService } from '../services/recognition.service';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  extractedText: string;

  filesToAnalyze: File[];

  selectedFile: File;

  textToSearch: string;

  constructor(private recognitionService: RecognitionService) { }

  ngOnInit(): void {
    this.filesToAnalyze = history.state.filesToAnalyze as File[];
    this.recognitionService.runRecognition(this.filesToAnalyze);
    if (this.filesToAnalyze && this.filesToAnalyze.length > 0) {
      this.selectFile(this.filesToAnalyze[0]);
    }
  }


  public selectFile(fileToSelect: File): void {
    this.selectedFile = fileToSelect;
  }

  public isFileSelected(fileToCheck: File): boolean {
    return this.selectedFile === fileToCheck;
  }


  public clearSearchTerm(): void {
    this.textToSearch = null;
  }

  exportFile() {
    const a = document.createElement('a');
    const blob = new Blob([this.extractedText], { type: 'octet/stream' });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'export.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  public isFinished(file: File): boolean {
    return this.recognitionService.isProcessingFileFinished(file);
  }

  public isImage(fileToCheck: File): boolean {
    return fileToCheck.type === 'image/png' || fileToCheck.type === 'image/jpeg'
      || fileToCheck.type === 'image/jpg' || fileToCheck.type === 'image/webp';
  }

  public isPDF(fileToCheck: File): boolean {
    return fileToCheck.type === 'application/pdf';
  }

}
