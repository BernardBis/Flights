import { DictionaryService } from './../../services/dictionary.service';
import { environment } from './../../../environments/environment.prod';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent implements OnInit {

  @Input() id: number;

  public name: string;

  constructor(private dictionaryService: DictionaryService) { }

  ngOnInit(): void {
    this.name = this.dictionaryService.getAirlineById(this.id).symbol;
  }

  public getAssetsPath = (): string => environment.assetsPath;
}
