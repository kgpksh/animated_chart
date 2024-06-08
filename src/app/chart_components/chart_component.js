"use client"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Colors} from "chart.js";
import { Bar, Doughnut, Line, Pie, Scatter } from "react-chartjs-2";
import useDataFileStore from "../zustand_file_storage";
import chartController from "../zustand_chart_controller";
import { BigChartTypes } from "../chart-parts-provider";

ChartJS.register(ArcElement, PointElement, LineElement, CategoryScale, Tooltip, Legend, LinearScale, BarElement, Colors);

export default function ChartView() {
    const {dataResource} = useDataFileStore()
    const {chartType} = chartController()
    
    const data = () => {
      if (!dataResource) {
        return {
            labels: [],
            datasets: []
        };
    }
    
      return {
        labels:dataResource[0],
        datasets: [
          {
            label:'first',
            data : dataResource[1]
          },
          {
            label:'asdf',
            data : dataResource[2]
          }
        ]
      }
    }

    const chartTypes = {
      [BigChartTypes.BAR] : <Bar data={data()} options={options}/>,
      [BigChartTypes.LINE] : <Line data={data()} options={options}/>,
      [BigChartTypes.PIE] : <Pie data={data()} options={options}/>,
      [BigChartTypes.SCATTERED] : <Scatter data={data()} options={options}/>,
      [BigChartTypes.DONUT] : <Doughnut data={data()} options={options}/>
    }

    return (
      dataResource ? chartTypes[chartType] : ''
    )
}