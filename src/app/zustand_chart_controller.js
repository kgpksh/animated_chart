"use client"

import { BigChartTypes } from "./chart-parts-provider";
import barAnimations from "./control_panel/animations/bar";
import lineAnimations from "./control_panel/animations/line";

const { create } = require("zustand");

const animations =  {
  [BigChartTypes.BAR] : barAnimations,
  [BigChartTypes.LINE] : lineAnimations,
  [BigChartTypes.PIE] : {},
  [BigChartTypes.SCATTERED] : {},
  [BigChartTypes.DONUT] : {},
  [BigChartTypes.RADAR] : {},
  [BigChartTypes.PORAR] : {},
}

let mediaRecorder = null

const chartController = create((set, get) => ({
  chartRef: null,
  setChartRef: (ref) => set({ chartRef: ref }),
  chartType : BigChartTypes.BAR,
  selectChartType(inputType) {
      set({chartType : inputType})
  },

  onComplete: (ctx) => {
    mediaRecorder?.stop()
    mediaRecorder = null
  },

  videoUrl : null,

  startRecord: () => {
    const canvas = get().chartRef.current.ctx.canvas;
    const options = { mimeType: 'video/webm; codecs=vp9', videoBitsPerSecond: 5 * 1024 * 1024 };
    mediaRecorder = new MediaRecorder(canvas.captureStream(), options);
    const arrVideoData = []

    mediaRecorder.ondataavailable = (evt) => {
      arrVideoData.push(evt.data)
    }

    mediaRecorder.onstop = (evt) => {
      const blob = new Blob(arrVideoData, { type: 'video/mp4' })
      const blobURL = window.URL.createObjectURL(blob)
      set({videoUrl : blobURL})
    }

    mediaRecorder.start()
  },

  easing : 'linear',
  setEasing(type) {
    set({easing : type})
  },

  animationsOfChartType : {
    [BigChartTypes.BAR] : {name : 'default', duration : 1000},
    [BigChartTypes.LINE] : {name : 'default', duration : 1000},
    [BigChartTypes.PIE] : {name : 'default', duration : 1000},
    [BigChartTypes.SCATTERED] : {name : 'default', duration : 1000},
    [BigChartTypes.DONUT] : {name : 'default', duration : 1000},
    [BigChartTypes.RADAR] : {name : 'default', duration : 1000},
    [BigChartTypes.PORAR] : {name : 'default', duration : 1000},

},

  setAniType (chartType, aniType, duration) {
    const animationsOfChartType = get().animationsOfChartType
    animationsOfChartType[chartType].name = aniType
    animationsOfChartType[chartType].duration = duration
    set({animationsOfChartType : {...animationsOfChartType}})
  },
  backgroundColor: '#FFFFFF',
  setBackgroundColor(color) {
      set({backgroundColor : color})
  },
  indexAxis : 'x',
  changeIndexAxis(newIndexAxis) {
    set({indexAxis : newIndexAxis})
  },

  useLabel : false,
  changeUseLabelStatus() {
    set((state) => {
      const changedState = !(state.useLabel)
      return {useLabel : changedState}
    })
  },
  cartesianScale : {
    x: {
      min : null,
      max : null,
      stacked: false,
      title : {
        display : false,
        text : 'X',
        align : 'end',
        font : {
          size : 50,
          weight : 'bold'
        }
      },
      type:'category',
      ticks: {
        stepSize: null,
        color : null,
        font : {
          size : null
        }
      },
      grid : {
        display : true,
        color : 'lightgrey'
      }
    },
    y: {
      min : null,
      max : null,
      stacked: false,
      title : {
        display : false,
        text : 'Y',
        align : 'end',
        font : {
          size : 50,
          weight : 'bold'
        }
      },
      
      type:'linear',
      ticks: {
        stepSize: null,
        color : null,
        font : {
          size : null
        }
      },
      grid : {
        display : true,
        color : 'lightgrey'
      }
    }
  },
  changeCartesianScale(scale){
    set({cartesianScale : scale})
  },

  radarElementsFill : {
    line : {
      fill : true
    }
  },
  changeRadarElementsFill(value) {
    set({radarElementsFill : value})
  },

  radarScale : {
    r : {
      pointLabels : {
        display : true,
        color : 'grey',
        font : {
          size : 20,
        }
      },
      ticks: {
        stepSize : null,
        display : true,
        backdropColor : 'rgb(0,0,0,0)',
        color: 'grey',
        font : {
          size : null
        }
      },
      angleLines : {
        display : true,
        color : 'lightgrey'
      },
      grid : {
        display : true,
        color : 'lightgrey'
      }
    }
  },

  changeRadarScale(scale) {
    set({radarScale : scale})
  },

  title: {
    display : false,
    text : 'New title',
    color: '#000000',
    align: 'center',
    position: 'top',
    font :{
      size : 20,
      weight : 'bold'
    },
  },
  changeTitle(title){
    set({title : title})
  }
}))

export default chartController