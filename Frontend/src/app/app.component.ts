import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QrScannerComponent } from './qrscanner/qrscanner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QrScannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Frontend';
}
