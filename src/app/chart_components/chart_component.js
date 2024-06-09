"use client"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Colors } from "chart.js";
import { Bar, Doughnut, Line, Pie, Scatter } from "react-chartjs-2";
import useDataFileStore from "../zustand_file_storage";
import chartController from "../zustand_chart_controller";
import { BigChartTypes } from "../chart-parts-provider";
import { useRef, useEffect, useState } from "react";

ChartJS.register(ArcElement, PointElement, LineElement, CategoryScale, Tooltip, Legend, LinearScale, BarElement, Colors);

export default function ChartView() {
  const chartRef = useRef(null);
  const { dataResource } = useDataFileStore();
  const { chartType, backgroundColor, useLabel } = chartController();
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [dataResource]);

  const plugin = {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart, args, options) => {
      const ctx = chartRef.current.ctx;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = options.color || '#ffffff';
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    }
  };

  const getDataSets = () => {
    if (!dataResource) {
      return [];
    }
    const datasets = [];
    for (let i = 1; i < dataResource.length; i++) {
      datasets.push({ label: useLabel ? dataResource[i][0] : null, data: useLabel ? dataResource[i].slice(1) : dataResource[i] });
    }
    return datasets;
  };

  const data = () => {
    if (!dataResource) {
      return {
        labels: [],
        datasets: []
      };
    }

    return {
      labels: useLabel ? dataResource[0].slice(1) : dataResource[0],
      datasets: getDataSets()
    };
  };

  const options = {
    indexAxis: 'x',
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      customCanvasBackgroundColor: {
        color: backgroundColor
      }
    }
  };

  const chartTypes = {
    [BigChartTypes.BAR]: <Bar key={key} ref={chartRef} data={data()} options={options} plugins={[plugin]} />,
    [BigChartTypes.LINE]: <Line key={key} ref={chartRef} data={data()} options={options} plugins={[plugin]} />,
    [BigChartTypes.PIE]: <Pie key={key} ref={chartRef} data={data()} options={options} plugins={[plugin]} />,
    [BigChartTypes.SCATTERED]: <Scatter key={key} ref={chartRef} data={data()} options={options} plugins={[plugin]} />,
    [BigChartTypes.DONUT]: <Doughnut key={key} ref={chartRef} data={data()} options={options} plugins={[plugin]} />
  };

  return (
    dataResource ? chartTypes[chartType] : ''
  );
}
