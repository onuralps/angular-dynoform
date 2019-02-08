import {Component} from '@angular/core';
import {MasterDataTable} from './models/object-config-model';
import config from '../assets/config.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public object = {
    test: 'value',
    test2: new Date(),
    test3: false,
    test4: 'testValue'
  };

  public config: MasterDataTable;


  constructor() {
    this.config = config;
  }


}
