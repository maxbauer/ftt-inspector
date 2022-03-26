import { AfterViewInit, Component } from '@angular/core';
import { ImageToTextService } from '../services/image-to-text.service';
import { PdfToImageService } from '../services/pdf-to-image.service';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements AfterViewInit {

  extractedText: string;

  isFinished = false;

  constructor(private convertService: PdfToImageService, private imageToTextService: ImageToTextService) { }


  ngAfterViewInit(): void {
    const fileToAnalyze = history.state.fileToAnalyze as File;
    this.startAnalyse(fileToAnalyze);
  }


  async startAnalyse(fileToAnalyze: File) {

    let imageToConvert;
    if (fileToAnalyze.type === 'application/pdf') {
      imageToConvert = await this.convertService.convertPdfToBase64Image(fileToAnalyze);
    } else {
      imageToConvert = fileToAnalyze;
    }

    this.showPreviewImage(imageToConvert);

    this.imageToTextService.convertImageToText(imageToConvert)
      .then(data => {
        this.isFinished = true;
        this.extractedText = data.text;
        this.createOverlay(data.words);
      })
      .catch(err => console.log(err));
  }

  createOverlay(words: any[]) {

    const previewElement = document.getElementById('previewImg') as HTMLImageElement;
    const realWidth = previewElement.naturalWidth;
    const width = previewElement.width;
    const factor = realWidth / width;

    const previewContainer = document.getElementById('preview-container') as HTMLDivElement;

    words.forEach(word => {
      const wordContainer = document.createElement('div') as HTMLDivElement;
      wordContainer.textContent = word.text;
      wordContainer.style.position = 'absolute';
      wordContainer.className = 'word-container';
      const boundingBox = word.bbox;
      wordContainer.style.top = boundingBox.y0 / factor + 'px';
      wordContainer.style.left = boundingBox.x0 / factor + 'px';
      wordContainer.style.width = (boundingBox.x1 - boundingBox.x0) / factor + 'px';
      wordContainer.style.height = (boundingBox.y1 - boundingBox.y0) / factor + 'px';
      wordContainer.style.backgroundColor = 'rgba(228, 205, 78, 0.3)';
      wordContainer.style.color = 'rgba(255, 255, 255, 0)';

      previewContainer.appendChild(wordContainer);
    });
  }


  showPreviewImage(imageToShow: string | File) {
    const previewElement = document.getElementById('previewImg') as HTMLImageElement;

    if (imageToShow instanceof File) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(imageToShow);
      fileReader.onload = () => {
        const result = fileReader.result;
        previewElement.src = result.toString();
      };
    } else if (typeof imageToShow === 'string') {
      previewElement.src = imageToShow;
    }

  }

  mark(event: Event) {
    const markValue = (event.target as HTMLInputElement).value;
    this.clearIt();
    if (markValue.length > 2) {
      const wordContainers = document.getElementsByClassName('word-container');
      for (let index = 0; index < wordContainers.length; index++) {
        const element = wordContainers.item(index) as HTMLDivElement;
        if (element.textContent.toLowerCase().includes(markValue.toLowerCase())) {
          element.style.backgroundColor = 'rgba(9, 171, 18, 0.4) ';
        }
      }
    }
  }

  clearIt() {
    const wordContainers = document.getElementsByClassName('word-container');
    for (let index = 0; index < wordContainers.length; index++) {
      const element = wordContainers.item(index) as HTMLDivElement;
      element.style.backgroundColor = 'rgba(228, 205, 78, 0.3)';
    }
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


}
