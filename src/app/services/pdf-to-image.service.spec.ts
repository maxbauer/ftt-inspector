import { TestBed } from '@angular/core/testing';

import { PdfToImageService } from './pdf-to-image.service';

describe('PdfToImageService', () => {
  let service: PdfToImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfToImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
