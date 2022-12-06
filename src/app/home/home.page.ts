import { Component, OnInit } from '@angular/core';
import { FileService } from '../file.service';
import { NetService } from '../net.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  foundCertificates = 0;
  pinningEnabled = false;
  pinningError: string | undefined;
  constructor(private netService: NetService, private fileService: FileService) {}

  async ngOnInit() {
    this.foundCertificates = await this.fileService.sslCertificates();
  }

  public async check() {
    await this.netService.setSSLPinning(this.pinningEnabled);
    this.pinningError = await this.netService.checkSSLPinning();
    if (!this.pinningError) {
      alert('Good to go!');
    }
  }

  public async checkGoogle() {
    await this.netService.setSSLPinning(this.pinningEnabled);
    this.pinningError = await this.netService.checkSSLPinningGoogle();
    if (!this.pinningError) {
      alert('Good to go!');
    }
  }

}
