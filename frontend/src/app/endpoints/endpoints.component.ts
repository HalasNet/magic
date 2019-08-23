
import { Component, OnInit } from '@angular/core';
import { Endpoint } from '../models/endpoint';
import { EndpointService } from '../services/endpoint-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-endpoints',
  templateUrl: './endpoints.component.html',
  styleUrls: ['./endpoints.component.scss']
})
export class EndpointsComponent implements OnInit {
  private displayedColumns: string[] = ['url', 'verb'];
  private endpoints: Endpoint[];
  private selected: Endpoint;
  private arguments: string;
  private isJsonArguments: boolean;
  private endpointResult: string;
  private currentUrl: string;

  constructor(
    private service: EndpointService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.service.getAllEndpoints().subscribe((res) => {
      this.endpoints = [];
      for (const idx of res) {
        const splits = idx.split('.');
        this.endpoints.push({
          url: splits[0],
          verb: splits[1]
        });
      }
    });
  }

  selectEndpoint(el: Endpoint) {
    this.selected = el;
    this.service.getEndpointMeta(el.url, el.verb).subscribe((res) => {
      switch (this.selected.verb) {
        case 'post':
        case 'put':
          this.isJsonArguments = true;
          this.arguments = JSON.stringify(res, null, 2);
          break;
        case 'get':
        case 'delete':
          this.isJsonArguments = false;
          let args = '';
          for (const idx in res) {
            if (Object.prototype.hasOwnProperty.call(res, idx)) {
              if (args.length > 0) {
                args += '&';
              }
              args += idx + '=' + res[idx];
            }
          }
          this.arguments = args;
          break;
        }
    });
  }

  evaluate() {

    this.currentUrl = this.selected.url;
    if (!this.isJsonArguments && this.arguments !== '') {
      // URL has query arguments.
      this.currentUrl += '?' + this.arguments;
    }

    switch (this.selected.verb) {
      case 'get':
        this.service.executeGet(this.currentUrl).subscribe((res) => {
          this.endpointResult = JSON.stringify(res, null, 2);
        }, (error) => {
          console.error(error);
          this.snackBar.open(error.error.message, 'Close', {
            duration: 10000,
            panelClass: ['error-snackbar'],
          });
        });
        break;
    }
    return false;
  }
}
