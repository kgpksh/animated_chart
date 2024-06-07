"use client"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import useDataFileStore from "../zustand_file_storage";

export default function ChartView() {
    ChartJS.register(ArcElement, CategoryScale, Tooltip, Legend, LinearScale, BarElement);
    const {dataResource} = useDataFileStore()
    const data = () => {
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

      return (
        dataResource ? <Bar data={data()}/> : ''
      )
}