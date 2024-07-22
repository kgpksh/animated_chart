"use client"
import { Button } from "@/components/ui/button"
import chartController from "../zustand_chart_controller"
import { Download } from "lucide-react"

export default function VideoCreateButtons() {
    const videoUrl = chartController((state) => state.videoUrl)
    const chartRef = chartController((state) => state.chartRef)
    const startRecord = chartController((state) => state.startRecord)
    const isRecording = chartController((state) => state.isRecording)
    const setProgress = chartController((state) => state.setProgress)
    
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
  
    return (
      <div className="w-full flex px-3 mb-2 items-center space-x-24">
        <Button 
                disabled={isRecording}
                onClick={() => {
                  setProgress(0)
                    startRecord()
                    const ctx = chartRef.current
                    ctx.reset()
                    ctx.update()
                }}>Create video
                </Button>
        <Button onClick={handleDownload} disabled={!videoUrl}>
          <Download className="mr-2"/>
          <div>Download</div>
        </Button>
      </div>
      
    )
}