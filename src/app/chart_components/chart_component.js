"use client";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, Chart, Doughnut, Line, Pie, Scatter } from "react-chartjs-2";
import useDataFileStore from "../zustand_file_storage";
import chartController from "../zustand_chart_controller";
import { BigChartTypes } from "../chart-parts-provider";
import { useRef, useEffect } from "react";

ChartJS.register(...registerables);

export default function ChartView() {
  const localChartRef = useRef(null);
  const { dataResource } = useDataFileStore();
  const { key, changeKey, chartType, backgroundColor, title, useLabel, cartesianScale, barOptions, lineOptions, pieOptions, donutOptions, scatteredOptions, indexAxis, chartRef, setChartRef } = chartController();

  const scaleOptions = {
    [BigChartTypes.BAR]: cartesianScale,
    [BigChartTypes.LINE]: cartesianScale,
    [BigChartTypes.PIE]: {},
    [BigChartTypes.DONUT]: {},
    [BigChartTypes.SCATTERED]: cartesianScale,
  }

  const common = {
    indexAxis: indexAxis,
    scales : scaleOptions[chartType],
    plugins: {
      customCanvasBackgroundColor: {
        color: backgroundColor
      },
      legend: {
        display : useLabel
      },
      title: title
    }
  };

  const currentOptionType = {
    [BigChartTypes.BAR]: barOptions,
    [BigChartTypes.LINE]: lineOptions,
    [BigChartTypes.PIE]: pieOptions,
    [BigChartTypes.DONUT]: donutOptions,
    [BigChartTypes.SCATTERED]: scatteredOptions,
  };

  const deepMerge = (target, source) => {
    const output = { ...target };
    for (const key of Object.keys(source)) {
      if (source[key] instanceof Object && key in target) {
        output[key] = deepMerge(target[key], source[key]);
      } else {
        output[key] = source[key];
      }
    }
    return output;
  };

  const allOptions = JSON.stringify({ common, barOptions, lineOptions, pieOptions, donutOptions, scatteredOptions });

  useEffect(() => {
    changeKey();
    setChartRef(localChartRef);
  }, [dataResource, chartType, allOptions, backgroundColor]);

  const plugin = {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart) => {
      const ctx = chart.ctx;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = backgroundColor;
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
  }

  const updatedOption = deepMerge(common, currentOptionType[chartType]);

  const chartTypes = {
    [BigChartTypes.BAR]: <Bar key={key} ref={localChartRef} data={data()} options={updatedOption} plugins={[plugin]} />,
    [BigChartTypes.LINE]: <Line key={key} ref={localChartRef} data={data()} options={updatedOption} plugins={[plugin]} />,
    [BigChartTypes.PIE]: <Pie key={key} ref={localChartRef} data={data()} options={updatedOption} plugins={[plugin]} />,
    [BigChartTypes.SCATTERED]: <Scatter key={key} ref={localChartRef} data={data()} options={updatedOption} plugins={[plugin]} />,
    [BigChartTypes.DONUT]: <Doughnut key={key} ref={localChartRef} data={data()} options={updatedOption} plugins={[plugin]} />
  };

  return (
    <Chart
    ref={localChartRef}
    type={chartType}
    options={updatedOption}
    data={data()}
    plugins={[plugin]}
    key={key}
    />
  );
}
