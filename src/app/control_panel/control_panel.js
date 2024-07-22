"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IntegratedDataPanel from "./input_file/integrated_data_panel";
import ChartControlPanel from "./select_chart_type/chart_control_panel";
import AnimationControlPanel from "./animations/animation_control_panel";
import VideoCreateButtons from "./video_create_buttons";
import chartController from "../zustand_chart_controller";
import { LoaderIcon } from "lucide-react";

export default function ControlPanel() {
    const isRecording = chartController((state) => state.isRecording)

    return (
        <div className="relative flex flex-col items-center w-96 border p-3 h-[85vh]">
            {isRecording && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-500 bg-opacity-50 z-50">
                    <LoaderIcon className="w-24 h-24 mb-4" />
                    <div className="text-xl font-bold">Creating video...</div>
                </div>
            )}
            <VideoCreateButtons />
            <Tabs defaultValue="dataManagement" className="flex flex-col items-center w-96 h-full border p-3">
                <TabsList className='w-full'>
                    <TabsTrigger value='dataManagement' className='w-full'>Import Data</TabsTrigger>
                    <TabsTrigger value='chartManagement' className='w-full'>Chart</TabsTrigger>
                    <TabsTrigger value='animationManagement' className='w-full'>Animation</TabsTrigger>
                </TabsList>
                <TabsContent value='dataManagement'>
                    <IntegratedDataPanel />
                </TabsContent>
                <TabsContent value='chartManagement' className='w-full h-full'>
                    <ChartControlPanel />
                </TabsContent>
                <TabsContent value='animationManagement' className='w-full h-full'>
                    <AnimationControlPanel />
                </TabsContent>
            </Tabs>
        </div>
    );
}