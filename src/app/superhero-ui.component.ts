import {Component} from '@angular/core';
import {FORM_DIRECTIVES} from '../components/form'
import {LineChart} from '../components/charts'
import {FakeDataService} from './fake-data.service';

@Component({
    moduleId: module.id,
    selector: 'superhero-ui-app',
    directives: [FORM_DIRECTIVES, LineChart],
    templateUrl: 'superhero-ui.component.html',
    styleUrls: ['superhero-ui.component.css'],
    providers: [FakeDataService]
})

export class SuperheroUiAppComponent {
    chartData;
    title = 'superhero-ui';
    user = {};

    constructor(public fakeDataService:FakeDataService) {
        this.chartData = fakeDataService.chartData;
    }

    changeChartData = function (){
        console.log('fired');
        this.chartData = [...this.fakeDataService.chartData.reverse()];
    }
}
