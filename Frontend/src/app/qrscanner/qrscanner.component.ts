import { Component, OnInit } from '@angular/core';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { FishStockService } from '../services/fish-stock.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-qr-scanner',
  standalone: true,
  templateUrl: './qrscanner.component.html',
  styleUrls: ['./qrscanner.component.css'],
  imports: [CommonModule, HttpClientModule],
})
export class QrScannerComponent implements OnInit {
  fishInfo: any = {}; // Almacenar la información recibida del backend

  // Inyectar FishStockService
  constructor(private fishStockService: FishStockService) {}

  ngOnInit(): void {
    this.startScanner();
  }

  startScanner() {
    const scanner = new Html5QrcodeScanner(
      'qr-reader',
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(
      (decodedText) => {
        console.log(`Código escaneado: ${decodedText}`);
        this.getFishInfo(decodedText); // Llamar al método que hace la solicitud al backend
      },
      (error) => {
        console.warn(`Error en el escaneo: ${error}`);
      }
    );
  }

  // Método para obtener la información del backend usando el servicio
  getFishInfo(reference: string) {
    this.fishStockService.getFishInfo(reference).subscribe(
      (data: any) => {
        this.fishInfo = data; // Guardar los datos recibidos
        console.log('Datos del pez:', this.fishInfo);
      },
      (error) => {
        console.error('Error al obtener la información del pez:', error);
      }
    );
  }
}
