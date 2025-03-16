import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { NoReactValidator } from './no-react.validator';
// import { FormsExperimentComponent } from './app/lib/experimental/forms-experiment/forms-experiment.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    // NoReactValidator,
    // FormsExperimentComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // person = {
  //   firstName : '',
  //   lastName: '',
  //   address: {
  //     city: '',
  //     street: 15,
  //   }
  // }
  //
  // onChange(event: string) {
  //   console.dir(event)
  //   this.person.firstName = event;
  // }
  //
  //
  // onSubmit(form: NgForm) {
  //   console.log(form)
  // }
}

