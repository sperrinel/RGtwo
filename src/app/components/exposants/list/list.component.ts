import { Component, OnInit } from '@angular/core';
import { Exposant } from 'src/app/models/exposant';
import { ExposantsService } from 'src/app/services/exposants.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  exposants!: Exposant[];
  constructor(private exposantsService: ExposantsService) {}

  ngOnInit(): void {
    this.exposants = this.exposantsService.exposants;
  }
}
