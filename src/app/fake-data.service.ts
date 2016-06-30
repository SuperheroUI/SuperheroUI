import {Injectable} from '@angular/core';

@Injectable()
export class FakeDataService {
    constructor() {        
    }

    chartConfig = {
        margin: {left:10, right: 30, bottom: 30, top: 10},
        dateFormat: "%d"
    };
    chartData = [
        {
            name: 'First Series',
            series: [
                {x: new Date('2007-04-28'), y: 104.92, tooltip: '<div style="color:red">Custom Tip</div>'},
                {x: new Date('2007-05-08'), y: 105.06, tooltip: '<div style="color:red">Custom Tip</div>'},
                {x: new Date('2007-05-09'), y: 106.88, tooltip: '<div style="color:red">Custom Tip</div>'},
                {x: new Date('2007-05-10'), y: 107.34, tooltip: '<div style="color:red">Custom Tip</div>'},
                {x: new Date('2007-05-11'), y: 108.74, tooltip: '<div style="color:red">Custom Tip</div>'},
                {x: new Date('2007-05-14'), y: 109.36, tooltip: '<div style="color:red">Custom Tip</div>'},
                {x: new Date('2007-05-15'), y: 107.52, tooltip: '<div style="color:red">Custom Tip</div>'},
                {x: new Date('2007-05-16'), y: 107.34, tooltip: '<div style="color:red">Custom Tip</div>'},
                {x: new Date('2007-05-17'), y: 109.44, tooltip: '<div style="color:red">Custom Tip</div>'},
                {x: new Date('2007-05-18'), y: 110.02, tooltip: '<div style="color:red">Custom Tip</div>'},
                {x: new Date('2007-05-19'), y: 111.98, tooltip: '<div style="color:red">Custom Tip</div>'},
                {x: new Date('2007-05-22'), y: 113.54, tooltip: '<div style="color:red">Custom Tip</div>'},
                {x: new Date('2007-05-23'), y: 112.89, tooltip: '<div style="color:red">Custom Tip</div>'},
                {x: new Date('2007-05-24'), y: 110.69, tooltip: '<div style="color:red">Custom Tip</div>'},
                {x: new Date('2007-05-25'), y: 113.62, tooltip: '<div style="color:red">Custom Tip</div>'},
                {x: new Date('2007-05-29'), y: 114.35, tooltip: '<div style="color:red">Custom Tip</div>'},
                {x: new Date('2007-05-30'), y: 118.77, tooltip: '<div style="color:red">Custom Tip</div>'},
                {x: new Date('2007-05-31'), y: 121.19, tooltip: '<div style="color:red">Custom Tip</div>'},
                {x: new Date('2007-06-01'), y: 118.40, tooltip: '<div style="color:red">Custom Tip</div>'},
                {x: new Date('2007-06-04'), y: 121.33, tooltip: '<div style="color:red">Custom Tip</div>'},
                {x: new Date('2007-06-07'), y: 122.67, tooltip: '<div style="color:red">Custom Tip</div>'}
            ]
        },
        {
            name: 'Second Series',
            series: [
                {x: new Date('2007-04-28'), y: 104.92},
                {x: new Date('2007-05-08'), y: 106.06},
                {x: new Date('2007-05-09'), y: 107.88},
                {x: new Date('2007-05-10'), y: 108.34},
                {x: new Date('2007-05-11'), y: 109.74},
                {x: new Date('2007-05-14'), y: 109.36},
                {x: new Date('2007-05-15'), y: 109.52},
                {x: new Date('2007-05-16'), y: 109.34},
                {x: new Date('2007-05-17'), y: 110.44},
                {x: new Date('2007-05-18'), y: 111.02},
                {x: new Date('2007-05-19'), y: 112.98},
                {x: new Date('2007-05-22'), y: 113.54},
                {x: new Date('2007-05-23'), y: 114.89},
                {x: new Date('2007-05-24'), y: 114.69},
                {x: new Date('2007-05-25'), y: 115.62},
                {x: new Date('2007-05-29'), y: 116.35},
                {x: new Date('2007-05-30'), y: 116.77},
                {x: new Date('2007-05-31'), y: 125.19},
                {x: new Date('2007-06-01'), y: 116.40},
                {x: new Date('2007-06-04'), y: 126.33},
                {x: new Date('2007-06-07'), y: 126.67}
            ]
        },
        {
            name: 'Third Series',
            series: [
                {x: new Date('2007-04-28'), y: 116},
                {x: new Date('2007-05-08'), y: 116},
                {x: new Date('2007-05-09'), y: 116},
                {x: new Date('2007-05-10'), y: 116},
                {x: new Date('2007-05-11'), y: 116},
                {x: new Date('2007-05-14'), y: 116},
                {x: new Date('2007-05-15'), y: 116},
                {x: new Date('2007-05-16'), y: 116},
                {x: new Date('2007-05-17'), y: 116},
                {x: new Date('2007-05-18'), y: 116},
                {x: new Date('2007-05-19'), y: 116},
                {x: new Date('2007-05-22'), y: 116},
                {x: new Date('2007-05-23'), y: 116},
                {x: new Date('2007-05-24'), y: 116},
                {x: new Date('2007-05-25'), y: 116},
                {x: new Date('2007-05-29'), y: 116},
                {x: new Date('2007-05-30'), y: 116},
                {x: new Date('2007-05-31'), y: 116},
                {x: new Date('2007-06-01'), y: 116},
                {x: new Date('2007-06-04'), y: 116},
                {x: new Date('2007-06-07'), y: 116}
            ]
        }
    ].reverse();
}
