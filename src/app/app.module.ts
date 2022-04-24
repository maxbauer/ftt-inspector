import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// NG Translate
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { InfoModule } from './info/info.module';
import { ResultModule } from './result/result.module';
import { ImageToTextService } from './services/image-to-text.service';
import { PdfToImageService } from './services/pdf-to-image.service';
import { RecognitionService } from './services/recognition.service';
import { UtilityService } from './services/utility.service';
import { SharedModule } from './shared/shared.module';


// AoT requires an exported function for factories
const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader => new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    // Pages
    HomeModule,
    ResultModule,
    InfoModule,
  ],
  providers: [
    UtilityService,
    PdfToImageService,
    ImageToTextService,
    RecognitionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

