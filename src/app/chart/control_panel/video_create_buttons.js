"use client"

import { Button } from "@/components/ui/button"
import chartController from "../zustand_chart_controller"
import { Download } from "lucide-react"
import { useEffect, useState } from "react"
import useAuthStore from "@/app/header_components/zustand_auth"
import CheckVideoAuth from "./check_video_auth"
import { SubscriptionStatus } from "@/app/subscription/subscription_status"

export default function VideoCreateButtons() {
    const firestoreSubscription = useAuthStore((state) => state.firestoreSubscription)
    const videoUrl = chartController((state) => state.videoUrl)
    const startRecord = chartController((state) => state.startRecord)
    const isRecording = chartController((state) => state.isRecording)
    const setProgress = chartController((state) => state.setProgress)
    const chartRef = chartController((state) => state.chartRef)
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()

    useEffect(() => {
      const updateDimensions = () => {
          const canvas = chartRef?.current?.ctx?.canvas;
          if (!canvas) {
              return;
          }
          setWidth(canvas.width);
          setHeight(canvas.height);
      };

      const canvas = chartRef?.current?.ctx?.canvas;
      if (canvas) {
          updateDimensions();

          const observer = new MutationObserver(updateDimensions);
          observer.observe(canvas, {
              attributes: true,
              attributeFilter: ['width', 'height']
          });

          return () => {
              observer.disconnect();
          };
      }
  }, [chartRef]);

    const handleDownload = () => {
      if (videoUrl) {
        const a = document.createElement('a')
        a.href = videoUrl
        a.download = new Date() + '.mp4' // 다운로드 파일 이름 설정
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }
    }

    if(!chartRef) {
      return null
    }
  
    return (
      <div className="w-full flex flex-col px-3 mb-2 ">
        {firestoreSubscription?.status === SubscriptionStatus.ACTIVE ?
          <div className="w-full flex items-center space-x-24">
            <Button
              disabled={isRecording}
              onClick={() => {
                setProgress(0)
                startRecord()
              }}
            >
              Create video
            </Button>
            <Button onClick={handleDownload} disabled={!videoUrl}>
              <Download className="mr-2"/>
              <div>Download</div>
            </Button>
          </div>
          :
          <CheckVideoAuth/>
        }
        <div className="text-xs mt-2">
          <div>As your current display status, size of video : {width} x {height}.</div>
          <div>The size and shape of the video is exactly the same as the size of the chart you're currently viewing.</div>
          <div>For the full-size video, maximize your browser's window.</div>
        </div>
      </div>
      
    )
}