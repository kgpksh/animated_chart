"use cilent"

import { Progress } from "@/components/ui/progress";
import chartController from "../zustand_chart_controller";

export default function RecordingView() {
    const isRecording = chartController((state) => state.isRecording)
    const progress = chartController((state) => state.progress)
    // const setProgress = chartController((state) => state.setProgress)
    

    // useEffect(() => {
    //     if (isRecording) {
    //       setProgress(0)
    //     }
    //   }, [isRecording, setProgress]);

      console.log(progress)
    return (
        <>
            {isRecording && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-[#09090B]">
                    <Progress value={progress}/>
                    <div className="text-xl font-bold">Creating video...</div>
                </div>
            )}
        </>
    )
}