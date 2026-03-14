/**
 * Charting Service Interface
 * Charting library interface
 */

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
  }>;
}

export interface IChartingService {
  createLineChart(data: ChartData, container: HTMLElement): void;
  createBarChart(data: ChartData, container: HTMLElement): void;
  createPieChart(data: ChartData, container: HTMLElement): void;
  destroyChart(container: HTMLElement): void;
}



