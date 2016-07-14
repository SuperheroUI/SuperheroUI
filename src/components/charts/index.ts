import {LineChart} from "./line-chart/line-chart.component";
import {GaugeChart} from "./gauge-chart/gauge-chart.component";
export { LineChart } from './line-chart/line-chart.component';
export { GaugeChart } from './gauge-chart/gauge-chart.component';
export { TooltipService } from './tooltip.service';

export const CHART_DIRECTIVES = [
    LineChart,
    GaugeChart
];