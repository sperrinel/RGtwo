import { Injectable } from '@angular/core';
import { Exposant } from '../models/exposant';

@Injectable({
  providedIn: 'root',
})
export class ExposantsService {
  exposants: Exposant[] = [
    {
      nom: 'Test1',
      description: 'test1',
      image: 'Test1',
    },
    {
      nom: 'Test2',
      description: 'test2',
      image: 'Test2',
    },
    {
      nom: 'Test3',
      description: 'test3',
      image: 'Test3',
    },
  ];
  constructor() {}
}
