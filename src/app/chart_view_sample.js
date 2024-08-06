"use client"

import { useTheme } from "next-themes";
import { Chart } from "react-chartjs-2";
import chartController from "./chart/zustand_chart_controller";

export default function ChartViewSample() {
  const registerBasics = chartController((state) => state.registerBasics)
  registerBasics()
  
    const { theme, setTheme } = useTheme()
    const delayBetweenPoints = 2000 / 12
    return (
        <Chart
            type="bar"
            data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [
                  {
                    label: 'Pizza',
                    data: [30, 25, 75, 95, 13, 55, 30, 26, 80, 32, 16, 48],
                  },
                  {
                    label: 'Hamburger',
                    data: [65, 59, 80, 81, 56, 30, 40, 38, 27, 68, 35, 55],
                  },
                ],
              }}
              options={
                {
                    animation: {
                        delay: (context) => {
                          let delay = 0;
                          if (context.type === 'data' && context.mode === 'default') {
                            delay = context.dataIndex * delayBetweenPoints
                          }
                          return delay;
                        },
                        duration: 2000,
                  },
                  scales: {
                    x: {
                      grid: {
                        color: theme === 'dark' ? 'rgba(249, 250, 251, 0.5)' : undefined
                      }
                    },
                    y: {
                      grid: {
                        color:theme === 'dark' ? 'rgba(249, 250, 251, 0.5)' : undefined
                      }
                    }
                  },
                    layout: {
                        padding: 20,
                    },
                    plugins: {
                        title: {
                                display : true,
                                text : 'Sales records',
                                color: theme ==='light' ? '#000000' : '#FFFFFF',
                                align: 'center',
                                position: 'top',
                                font :{
                                size : 30,
                                weight : 'bold'
                                },
                            },
                            datalabels: {
                              display: false
                            }
                        }
                }
            }
        />
    )
}