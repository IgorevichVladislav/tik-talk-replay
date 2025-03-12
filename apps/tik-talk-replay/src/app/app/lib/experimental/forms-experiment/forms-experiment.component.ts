import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Feature, IWarranty, MockService } from './mock.service';
import { AsyncPipe, KeyValuePipe, NgStyle } from '@angular/common';
import { NameValidator } from './name.validator';
import { MaskitoDirective } from '@maskito/angular';
import { MaskitoOptions } from '@maskito/core';
import {
  maskitoAddOnFocusPlugin,
  maskitoDateOptionsGenerator,
  maskitoRemoveOnBlurPlugin,
} from '@maskito/kit';
import { maskitoPhoneOptionsGenerator } from '@maskito/phone';
import metadata from 'libphonenumber-js/max/metadata';
import { getCountryCallingCode } from 'libphonenumber-js';
import { find, map, switchMap, tap } from 'rxjs';

interface Address {
  city?: string;
  street?: string;
  building?: number;
  apartment?: number;
  telephone?: number;
}

// function getAddressForm(initialValue: Address = {}) {
//   return new FormGroup({
//     city: new FormControl<string>(initialValue.city ?? ''),
//     street: new FormControl<string>(initialValue.street ?? ''),
//     building: new FormControl<number | null>(initialValue.building ?? null),
//     apartment: new FormControl<number | null>(initialValue.apartment ?? null)
//   })}

@Component({
  selector: 'app-forms-experiment',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    KeyValuePipe,
    NgStyle,
    MaskitoDirective,
    AsyncPipe,
  ],
  templateUrl: './forms-experiment.component.html',
  styleUrl: './forms-experiment.component.scss',
})
export class FormsExperimentComponent {
  mockService = inject(MockService);
  nameValidator = inject(NameValidator);
  #fb = inject(FormBuilder);

  selectTvs$ = this.mockService.selectTvs();
  warrantyPeriod$ = this.mockService.warrantyPeriod();

  warrantyPeriods = signal<IWarranty[]>([]);

  features: Feature[] = [];
  phoneMaskOptions: MaskitoOptions;

  dateMask = maskitoDateOptionsGenerator({
    mode: 'dd/mm/yyyy', // Формат даты
    separator: '.', // Разделитель (точка)
  });

  // form = new FormGroup({
  //   type: new FormControl<ReceiverType>(ReceiverType.PERSON),
  //   name: new FormControl<string>('', Validators.required),
  //   lastName: new FormControl<string>({value: '', disabled: true}, []),
  //   inn: new FormControl<string>(''),
  //   addresses: new FormArray([getAddressForm()]),
  //   feature: new FormRecord({})
  // });

  form = this.#fb.group({
    type: this.#fb.control<string>(''),
    cause: this.#fb.control<string>('', {
      validators: [Validators.required],
      asyncValidators: [this.nameValidator.validate.bind(this.nameValidator)],
      updateOn: 'blur',
    }),
    dateRange: this.#fb.control('', { validators: [Validators.required] }),
    guarantee: this.#fb.nonNullable.control(''),
    addresses: this.#fb.array([this.getAddressForm()]),
    feature: this.#fb.record({}),
  });

  getAddressForm(initialValue: Address = {}) {
    return this.#fb.group({
      city: this.#fb.control<string>(initialValue.city ?? ''),
      street: this.#fb.control<string>(initialValue.street ?? ''),
      building: this.#fb.nonNullable.control<number | null>(
        initialValue.building ?? null
      ),
      apartment: this.#fb.nonNullable.control<number | null>(
        initialValue.apartment ?? null
      ),
      telephone: this.#fb.nonNullable.control<number | null>(
        initialValue.telephone ?? null
      ),
    });
  }

  constructor() {
    // Инициализация конфигурации Maskito для телефона
    const countryIsoCode = 'RU'; // Укажите нужную страну
    const code = getCountryCallingCode(countryIsoCode);
    const prefix = `+${code} `;

    const phoneOptions = maskitoPhoneOptionsGenerator({
      metadata,
      countryIsoCode,
      strict: true,
    });

    this.phoneMaskOptions = {
      ...phoneOptions,
      plugins: [
        ...phoneOptions.plugins,
        maskitoAddOnFocusPlugin(prefix),
        maskitoRemoveOnBlurPlugin(prefix),
      ],
    };

    this.mockService
      .getAddresses()
      .pipe(takeUntilDestroyed())
      .subscribe((addresses) => {
        // while (this.form.controls.addresses.controls.length > 0) {
        // this.form.controls.addresses.removeAt(0)
        // }

        this.form.controls.addresses.clear();

        for (const address of addresses) {
          this.form.controls.addresses.push(this.getAddressForm(address));
        }

        // this.form.controls.addresses.setControl(1, this.getAddressForm(addresses[0]))
        // console.log(this.form.controls.addresses.at(0))
      });

    this.mockService
      .getFeatures()
      .pipe(takeUntilDestroyed())
      .subscribe((features) => {
        this.features = features;

        for (const feature of features) {
          this.form.controls.feature.addControl(
            feature.code,
            this.#fb.control(feature.value)
          );
        }
      });

    this.form.controls.type.valueChanges
      .pipe(
        switchMap((value) => {
          return this.selectTvs$.pipe(
            map((tvs) => tvs.find((tv) => tv.typeProduct === value)),
            switchMap((findValue) => {
              return this.warrantyPeriod$.pipe(
                map((warranty) =>
                  warranty.filter(
                    (war) => war.noWarranty === findValue?.noWarranty
                  )
                ),
                tap((filterValue) => this.warrantyPeriods.set(filterValue))
              );
            })
          );
        })
      )
      .subscribe();
  }

  onSubmit(event: SubmitEvent) {
    // this.form.reset()
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    console.log('form value', this.form.value);
    console.log('raw value', this.form.getRawValue());
  }

  addAddress() {
    // this.form.controls.addresses.push(this.getAddressForm(), {emitEvent: false})
    this.form.controls.addresses.insert(0, this.getAddressForm());
  }

  deleteForm(index: number) {
    this.form.controls.addresses.removeAt(index, { emitEvent: false });
  }

  sort = () => 0;

  protected readonly tap = tap;
  protected readonly console = console;
}
