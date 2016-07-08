import {Component} from "@angular/core";
import {FORM_DIRECTIVES} from "../components/form";
import {InputSelectConfig} from "../components/form/input-select.component";
import {LineChart} from "../components/charts";
import {FakeDataService} from "./fake-data.service";

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
    chartConfig;
    title = 'superhero-ui';
    user = {};
    statusOptions = [
        'New',
        'Contacted',
        'Customer'
    ];

    status2Options = [
        {name: 'one', id: 1},
        {name: 'two', id: 2},
        {name: 'three', id: 3},
    ];
    statusConfig = new InputSelectConfig();
    statusConfig2 = new InputSelectConfig('multi', 'id');

    constructor(public fakeDataService:FakeDataService) {
        this.chartData = fakeDataService.chartData;
        this.chartConfig = fakeDataService.chartConfig;
    }

    changeChartData = function (){
        this.chartData = [...this.fakeDataService.chartData.reverse()];
    }
}
