"use client";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
import useDataFileStore from "../zustand_file_storage";
import chartController from "../zustand_chart_controller";
import { BigChartTypes } from "../chart-parts-provider";
import { useRef, useEffect, useState } from "react";
import { isCartesian } from "@/lib/utils";
import animations from "../control_panel/animations/animations";

ChartJS.register(...registerables);

export default function ChartView() {
  const localChartRef = useRef(null);
  const dataResource = useDataFileStore((state) => state.dataResource);
  const setChartRef  = chartController((state) => state.setChartRef);
  const chartType = chartController((state) => state.chartType)
  const backgroundColor = chartController((state) => state.backgroundColor)
  const indexAxis = chartController((state) => state.indexAxis)
  const cartesianScale = chartController((state) => state.cartesianScale)
  const radarScale = chartController((state) => state.radarScale)
  const radarElementsFill = chartController(state => state.radarElementsFill)
  const title = chartController((state) => state.title)
  const useLabel = chartController((state) => state.useLabel)
  const animationsOfChartType = chartController((state) => state.animationsOfChartType)
  const onComplete = chartController((state) => state.onComplete)
  const easing = chartController((state) => state.easing)

  const[key, setKey] = useState(0)
  useEffect(() => {
    setChartRef(localChartRef);
  }, []);
  
  useEffect(() => {
    setKey(key === 0 ? 1 : 0)
  }, [backgroundColor]);

  const isFlexibleLegend = () => {
    return isCartesian(chartType) || chartType === BigChartTypes.RADAR;
  };

  const animationType = 'number'
  const animationConfig = animationsOfChartType[chartType]

  const animation = {
    onComplete: onComplete,
    ...animations[chartType][animationConfig.name](animationConfig.duration, animationType, easing, indexAxis)
  }

  const scaleOptions = () => {
    const options = {
      [BigChartTypes.BAR]: cartesianScale,
      [BigChartTypes.LINE]: cartesianScale,
      [BigChartTypes.PIE]: {},
      [BigChartTypes.DONUT]: {},
      [BigChartTypes.SCATTERED]: cartesianScale,
      [BigChartTypes.RADAR]: radarScale,
      [BigChartTypes.PORAR]: radarScale,
    };

    if (chartType === BigChartTypes.RADAR) {
      options[chartType].r.pointLabels.display = true;
    } else if (chartType === BigChartTypes.PORAR) {
      options[chartType].r.pointLabels.display = false;
    }

    return options[chartType];
  }

  const complete_option = {
      layout: {
        padding: 20,
      },
      animation: animation,
      elements: chartType === BigChartTypes.RADAR ? radarElementsFill : null,
      indexAxis: indexAxis,
      scales: scaleOptions(),
      plugins: {
        colors : {
          forceOverride: true
        },
        customCanvasBackgroundColor: {
          color: backgroundColor,
        },
        legend: {
          display: isCartesian(chartType) || chartType === BigChartTypes.RADAR ? useLabel : true,
        },
        title: title,
      },
    }

  const plugin = {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart) => {
        const ctx = chart.ctx;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      },
    };

  const getDataSets = () => {
    if (!dataResource) {
      return [];
    }
    const datasets = [];
    for (let i = 1; i < dataResource.length; i++) {
      datasets.push({
        label: isFlexibleLegend() ? (useLabel ? dataResource[i][0] : null) : null,
        data: isFlexibleLegend() ? (useLabel ? dataResource[i].slice(1) : dataResource[i]) : dataResource[i],
      });
    }
    return datasets;
  };

  const data = () => {
    if (!dataResource) {
      return {
        labels: [],
        datasets: [],
      };
    }

  return {
      labels: isFlexibleLegend() ? (useLabel ? dataResource[0].slice(1) : dataResource[0]) : dataResource[0],
      datasets: getDataSets(useLabel),
    };
  };
  
  console.log(complete_option)

  return (
    <Chart
      key={key}
      ref={localChartRef}
      type={chartType}
      options={complete_option}
      data={data()}
      plugins={[plugin]}
    />
  );
}
