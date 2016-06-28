import {Component} from "@angular/core";
import {FORM_DIRECTIVES} from "../components/form";
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

    constructor(public fakeDataService:FakeDataService) {
        this.chartData = fakeDataService.chartData;
        this.chartConfig = fakeDataService.chartConfig;
    }

    changeChartData = function (){
        this.chartData = [...this.fakeDataService.chartData.reverse()];
    }
}
