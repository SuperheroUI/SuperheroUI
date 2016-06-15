import { Component } from '@angular/core';
import { InputTextComponent } from '../components/form'

@Component({
  moduleId: module.id,
  selector: 'superhero-ui-app',
  directives: [InputTextComponent],
  templateUrl: 'superhero-ui.component.html',
  styleUrls: ['superhero-ui.component.css']
})
export class SuperheroUiAppComponent {
  title = 'superhero-ui works!';
  name = '2';
}
