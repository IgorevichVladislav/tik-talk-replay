import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Feature {
  code: string;
  label: string;
  value: boolean;
}

export interface IProduct {
  typeProduct: string;
  nameProduct: string;
  noWarranty: boolean;
}

export interface IWarranty {
  typeWarranty: string;
  nameWarranty: string;
  noWarranty: boolean;
}

@Injectable({ providedIn: 'root' })
export class MockService {
  getAddresses() {
    return of([
      {
        city: 'Москва',
        street: 'Тверская',
        building: 14,
        apartment: 32,
      },
      // {
      //   'city': 'Санкт-Петербург',
      //   'street': 'Солевая',
      //   'building': 17,
      //   'apartment': 25
      // }
    ]);
  }

  getFeatures(): Observable<Feature[]> {
    return of([
      {
        code: 'lift',
        label: 'Подъем на этаж',
        value: true,
      },
      {
        code: 'strong-package',
        label: 'Усиленная упаковка',
        value: true,
      },
      {
        code: 'fast',
        label: 'Ускоренная доставка',
        value: false,
      },
    ]);
  }

  selectTvs(): Observable<IProduct[]> {
    return of([
      { typeProduct: 'OLED', nameProduct: 'OLED-телевизор', noWarranty: false },
      { typeProduct: 'QLED', nameProduct: 'QLED-телевизор', noWarranty: false },
      { typeProduct: 'LCD', nameProduct: 'LCD-телевизор', noWarranty: false },
      { typeProduct: 'LED', nameProduct: 'LED-телевизор', noWarranty: false },
      {
        typeProduct: 'POP',
        nameProduct: 'POP-панель (плазма)',
        noWarranty: true,
      },
      {
        typeProduct: 'ELT',
        nameProduct: 'ЭЛТ-телевизор (кинескоп)',
        noWarranty: true,
      },
    ]);
  }

  warrantyPeriod(): Observable<IWarranty[]> {
    return of([
      { typeWarranty: 'one', nameWarranty: 'Один месяц', noWarranty: false },
      { typeWarranty: 'three', nameWarranty: 'Три месяца', noWarranty: false },
      { typeWarranty: 'six', nameWarranty: '6 месяцев', noWarranty: false },
      { typeWarranty: 'year', nameWarranty: '1 год', noWarranty: false },
      {
        typeWarranty: 'none',
        nameWarranty: 'Гарантия отсутствует',
        noWarranty: true,
      },
    ]);
  }
}
