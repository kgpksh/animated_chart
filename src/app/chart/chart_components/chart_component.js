"use client";
import { Chart } from "react-chartjs-2";
import useDataFileStore from "../zustand_file_storage";
import chartController from "../zustand_chart_controller";
import { BigChartTypes } from "../chart-parts-provider";
import { useRef, useEffect, useState } from "react";
import { isCartesian } from "@/lib/utils";
import animations from "../control_panel/animations/animations";
import RecordingView from "./recording_view";

export default function ChartView() {
  const registerBasics = chartController((state) => state.registerBasics)
  const registerDataLabels = chartController((state) => state.registerDataLabels)
  registerBasics()
  registerDataLabels()
  
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
  const setProgress = chartController((state) => state.setProgress)
  const toggleOverlayLabels = chartController((state) => state.toggleOverlayLabels)
  const overlayLabelsSize = chartController((state) => state.overlayLabelsSize)

  const [key, setKey] = useState(0)

  useEffect(() => {
    setChartRef(localChartRef);
  }, []);
  
  useEffect(() => {
    setKey(key === 0 ? 1 : 0)
  }, [backgroundColor]);

  const isFlexibleLegend = () => {
    return isCartesian(chartType) || chartType === BigChartTypes.RADAR;
  };

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
      datasets: getDataSets(),
    };
  };

  const completeData = data()
  const animationType = 'number'
  const animationConfig = animationsOfChartType[chartType]

  const animation = {
    onComplete: onComplete,
    onProgress: (ctx) => {
      const progress = (ctx.currentStep / ctx.numSteps) * 100
      if(progress % 2 === 0) {
        setProgress(progress)
      }
    },
    ...animations[chartType][animationConfig.name](animationConfig.duration, animationType, easing, indexAxis, completeData?.datasets[0]?.data.length)
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
      datalabels: {
        display: toggleOverlayLabels,
        color: 'black',
        font: {
          size: overlayLabelsSize
        }
      },
    },
  }
  
  return (
    <div className="relative w-full h-5/6 flex items-center justify-center">
     
        <RecordingView/>
        <Chart
          key={key}
          ref={localChartRef}
          type={chartType}
          options={complete_option}
          data={completeData}
          plugins={[plugin]}
        />
    </div>
  );
}
