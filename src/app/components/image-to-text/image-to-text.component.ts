import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecognitionService } from '../../services/recognition.service';

@Component({
  selector: 'app-image-to-text-component',
  templateUrl: './image-to-text.component.html',
  styleUrls: ['./image-to-text.component.scss']
})
export class ImageToTextComponent implements OnChanges {

  componentID: string;

  @Input() file: File;
  @Input() searchTerm: string;
  @Input() isVisible: boolean;

  //TODO: sync information back to result page
  @Output() numberOfSearchMatches = new EventEmitter<number>();

  isFinished = false;


  constructor(public dialog: MatDialog, private recognitionService: RecognitionService) {
    this.componentID = Math.random().toString(16).slice(2);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.file && !changes.file.previousValue && changes.file.currentValue) {
      this.file = changes.file.currentValue;
    }
    if (changes.searchTerm && changes.searchTerm.previousValue !== changes.searchTerm.currentValue) {
      if (this.isFinished) {
        this.search(changes.searchTerm.currentValue);
      }
    }
    if (changes.isVisible && changes.isVisible.previousValue !== changes.isVisible.currentValue && changes.isVisible.currentValue) {
      this.recognitionService.getResultForFile(this.file).then(async recognitionResult => {
        this.isFinished = true;
        await this.showPreviewImage(recognitionResult.image);
        this.createOverlay(recognitionResult.wordsWithPosition);
        this.search(this.searchTerm);
      });
    }
  }

  private async showPreviewImage(imageToShow: string | File): Promise<void> {
    const previewImage = document.getElementById(`preview-image-${this.componentID}`) as HTMLImageElement;

    if (imageToShow instanceof File) {
      const imageReadPromise = new Promise((resolve) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          const result = fileReader.result;
          previewImage.src = result.toString();
          resolve(true);
        };
        fileReader.readAsDataURL(imageToShow);
      });
      await imageReadPromise;
    } else if (typeof imageToShow === 'string') {
      previewImage.src = imageToShow;
    }

    const imageLoadPromise = new Promise((resolve) => {
      previewImage.onload = () => {
        resolve(true);
      };
    });
    await imageLoadPromise;
  }

  private createOverlay(words: any[]): void {
    this.removeAllFindings();
    const previewContainer = document.getElementById(`preview-container-${this.componentID}`) as HTMLDivElement;
    const previewImage = document.getElementById(`preview-image-${this.componentID}`) as HTMLImageElement;

    if (!previewContainer || !previewImage) {
      return;
    }

    const realWidth = previewImage.naturalWidth;
    const width = previewImage.width;
    const factorX = realWidth / width;

    const realHeight = previewImage.naturalHeight;
    const height = previewImage.height;
    const factorY = realHeight / height;

    words.forEach(word => {
      const wordContainer = document.createElement('div') as HTMLDivElement;
      wordContainer.textContent = word.text;
      wordContainer.style.position = 'absolute';
      wordContainer.className = `word-container`;
      const boundingBox = word.bbox;

      wordContainer.style.top = boundingBox.y0 / factorY + 'px';
      wordContainer.style.left = boundingBox.x0 / factorX + 'px';
      wordContainer.style.width = (boundingBox.x1 - boundingBox.x0) / factorX + 'px';
      wordContainer.style.height = (boundingBox.y1 - boundingBox.y0) / factorY + 'px';
      wordContainer.style.backgroundColor = 'rgba(228, 205, 78, 0.3)';
      wordContainer.style.color = 'rgba(255, 255, 255, 0)';

      previewContainer.appendChild(wordContainer);
    });
  }

  private search(searchTerm: string): void {
    const findings = this.clearSearchResults();
    let numberOfSearchMatches = 0;
    if (searchTerm && searchTerm.length > 2) {
      findings.forEach(finding => {
        const element = finding as HTMLDivElement;
        if (element.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
          element.style.backgroundColor = 'rgba(9, 171, 18, 0.4) ';
          numberOfSearchMatches++;
        }
      });
    }
    this.numberOfSearchMatches.emit(numberOfSearchMatches);
  }

  private clearSearchResults(): NodeListOf<Element> {
    const findings = document.querySelectorAll('.word-container');
    findings.forEach(finding => {
      const element = finding as HTMLDivElement;
      element.style.backgroundColor = 'rgba(228, 205, 78, 0.3)';
    });
    return findings;
  }

  private removeAllFindings(): void {
    const findings = document.querySelectorAll('.word-container');
    findings.forEach(finding => {
      finding.remove();
    });
  }


}
