import {Component} from "@angular/core";
import {FORM_DIRECTIVES} from "../components/form";
import {InputSelectConfig} from "../components/form/input-select.component";
import {CHART_DIRECTIVES} from "../components/charts";
import {FakeDataService} from "./fake-data.service";
import {TOOLTIP_DIRECTIVES} from "../components/tooltip/index";
import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'superhero-ui-app',
    directives: [FORM_DIRECTIVES, CHART_DIRECTIVES, TOOLTIP_DIRECTIVES],
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

    score = .5;
    gaugeConfig:any = {};

    status2Options = [
        {name: 'one', id: 1},
        {name: 'two', id: 2},
        {name: 'three', id: 3},
    ];

    toolTipConfig = {
        position: 'top'
    };
    toolTipConfig2 = {
        position: 'bottom'
    };
    toolTipConfig3 = {
        position: 'left'
    };
    toolTipConfig4 = {
        position: 'right'
    };
    statusConfig = new InputSelectConfig();
    statusConfig2 = new InputSelectConfig('multi', 'id');

    constructor(public fakeDataService:FakeDataService) {
        this.chartData = fakeDataService.chartData;
        this.chartConfig = fakeDataService.chartConfig;
    }

    changeChartData = function () {
        this.chartData = [...this.fakeDataService.chartData.reverse()];
        this.score = _.random(0,.99);
    }
}
