import {Component} from '@angular/core';
import {FORM_DIRECTIVES} from '../components/form'
import {LineChart} from '../components/charts'

@Component({
    moduleId: module.id,
    selector: 'superhero-ui-app',
    directives: [FORM_DIRECTIVES, LineChart],
    templateUrl: 'superhero-ui.component.html',
    styleUrls: ['superhero-ui.component.css']
})
export class SuperheroUiAppComponent {
  title = 'superhero-ui';
    data = [
        {
            name: 'First Series',
            series: [
                {x: new Date('24-Apr-07'), y: 103.92},
                {x: new Date('8-May-07'), y: 105.06},
                {x: new Date('9-May-07'), y: 106.88},
                {x: new Date('10-May-07'), y: 107.34},
                {x: new Date('11-May-07'), y: 108.74},
                {x: new Date('14-May-07'), y: 109.36},
                {x: new Date('15-May-07'), y: 107.52},
                {x: new Date('16-May-07'), y: 107.34},
                {x: new Date('17-May-07'), y: 109.44},
                {x: new Date('18-May-07'), y: 110.02},
                {x: new Date('21-May-07'), y: 111.98},
                {x: new Date('22-May-07'), y: 113.54},
                {x: new Date('23-May-07'), y: 112.89},
                {x: new Date('24-May-07'), y: 110.69},
                {x: new Date('25-May-07'), y: 113.62},
                {x: new Date('29-May-07'), y: 114.35},
                {x: new Date('30-May-07'), y: 118.77},
                {x: new Date('31-May-07'), y: 121.19},
                {x: new Date('1-Jun-07'), y: 118.40},
                {x: new Date('4-Jun-07'), y: 121.33},
                {x: new Date('5-Jun-07'), y: 122.67}
            ]
        },
        {
            name: 'Second Series',
            series: [
                {x: new Date('24-Apr-07'), y: 104.92},
                {x: new Date('8-May-07'),  y: 106.06},
                {x: new Date('9-May-07'),  y: 107.88},
                {x: new Date('10-May-07'), y: 108.34},
                {x: new Date('11-May-07'), y: 109.74},
                {x: new Date('14-May-07'), y: 109.36},
                {x: new Date('15-May-07'), y: 109.52},
                {x: new Date('16-May-07'), y: 109.34},
                {x: new Date('17-May-07'), y: 110.44},
                {x: new Date('18-May-07'), y: 111.02},
                {x: new Date('21-May-07'), y: 112.98},
                {x: new Date('22-May-07'), y: 113.54},
                {x: new Date('23-May-07'), y: 114.89},
                {x: new Date('24-May-07'), y: 114.69},
                {x: new Date('25-May-07'), y: 115.62},
                {x: new Date('29-May-07'), y: 116.35},
                {x: new Date('30-May-07'), y: 116.77},
                {x: new Date('31-May-07'), y: 125.19},
                {x: new Date('1-Jun-07'),  y: 116.40},
                {x: new Date('4-Jun-07'),  y: 126.33},
                {x: new Date('5-Jun-07'),  y: 126.67}
            ]
        },
        {
            name: 'Third Series',
            series: [
                {x: new Date('24-Apr-07'), y: 116},
                {x: new Date('8-May-07'),  y: 116},
                {x: new Date('9-May-07'),  y: 116},
                {x: new Date('10-May-07'), y: 116},
                {x: new Date('11-May-07'), y: 116},
                {x: new Date('14-May-07'), y: 116},
                {x: new Date('15-May-07'), y: 116},
                {x: new Date('16-May-07'), y: 116},
                {x: new Date('17-May-07'), y: 116},
                {x: new Date('18-May-07'), y: 116},
                {x: new Date('21-May-07'), y: 116},
                {x: new Date('22-May-07'), y: 116},
                {x: new Date('23-May-07'), y: 116},
                {x: new Date('24-May-07'), y: 116},
                {x: new Date('25-May-07'), y: 116},
                {x: new Date('29-May-07'), y: 116},
                {x: new Date('30-May-07'), y: 116},
                {x: new Date('31-May-07'), y: 116},
                {x: new Date('1-Jun-07'),  y: 116},
                {x: new Date('4-Jun-07'),  y: 116},
                {x: new Date('5-Jun-07'),  y: 116}
            ]
        }
    ].reverse();
  user = {};
}
