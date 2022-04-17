
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ImageToTextComponent } from '.';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatInputModule,
        MatDividerModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        MatSidenavModule,
        DragDropModule,
        MatListModule,
        MatTabsModule,
        MatExpansionModule,
        MatStepperModule,
        MatProgressBarModule,
    ],
    declarations: [
        ImageToTextComponent,
    ],
    exports: [
        CommonModule,
        ImageToTextComponent,
    ]
})
export class UiComponentsModule { }
