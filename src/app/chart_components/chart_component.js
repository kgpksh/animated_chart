"use client"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Colors, plugins} from "chart.js";
import { Bar, Doughnut, Line, Pie, Scatter } from "react-chartjs-2";
import useDataFileStore from "../zustand_file_storage";
import chartController from "../zustand_chart_controller";
import { BigChartTypes } from "../chart-parts-provider";
import { useRef } from "react";

ChartJS.register(ArcElement, PointElement, LineElement, CategoryScale, Tooltip, Legend, LinearScale, BarElement, Colors);

export default function ChartView() {
  const chartRef = useRef(null)

  const plugin = {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart, args, options) => {
      const ctx = chartRef.current.ctx
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = options.color || '#ffffff';
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    }
  };

  const {dataResource } = useDataFileStore()
  const {chartType, backgroundColor} = chartController()

  const datasets = [];
  for (let i = 1; i < dataResource.length; i++) {
      datasets.push({ label: 'test', data: dataResource[i] });
  }
  
  const data = () => {
    if (!dataResource) {
      return {
          labels: [],
          datasets: []
      };
  }
  
    return {
      labels:dataResource[0],
      // datasets: [
      //   {
      //     label:'first',
      //     data : dataResource[1]
      //   },
      //   {
      //     label:'asdf',
      //     data : dataResource[2]
      //   }
      // ]
      datasets : datasets
    }
  }

  

  const options = {
    plugins: {
      customCanvasBackgroundColor: {
        color : backgroundColor
      }
    }
  };

  const chartTypes = {
    [BigChartTypes.BAR] : <Bar ref={chartRef} data={data()} options={options} plugins={[plugin]}/>,
    [BigChartTypes.LINE] : <Line ref={chartRef} data={data()} options={options} plugins={[plugin]}/>,
    [BigChartTypes.PIE] : <Pie ref={chartRef} data={data()} options={options} plugins={[plugin]}/>,
    [BigChartTypes.SCATTERED] : <Scatter ref={chartRef} data={data()} options={options} plugins={[plugin]}/>,
    [BigChartTypes.DONUT] : <Doughnut ref={chartRef} data={data()} options={options} plugins={[plugin]}/>
  }

  return (
    dataResource ? chartTypes[chartType] : ''
  )
}