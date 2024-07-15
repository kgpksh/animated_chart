"use client"
import { Button } from "@/components/ui/button"
import chartController from "../zustand_chart_controller"

export default function VideoDownloadButton() {
    const videoUrl = chartController((state) => state.videoUrl)
    const url = videoUrl ? videoUrl : ''

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
      <Button onClick={handleDownload} disabled={!videoUrl}>
        Download
      </Button>
    )
}