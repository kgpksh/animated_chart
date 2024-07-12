"use client"

import chartController from "@/app/zustand_chart_controller";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRef } from "react";
import barAnimations from "./bar";
import lineAnimations from "./line";
import { BigChartTypes } from "@/app/chart-parts-provider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AnimationControlPanel() {
    const durationRef = useRef(1500)
    const chartType = chartController((state) => state.chartType)
    const animationsOfChartType = chartController((state) => state.animationsOfChartType)
    const setAniType = chartController((state) => state.setAniType)

    const animations = {
        [BigChartTypes.BAR] : barAnimations,
        [BigChartTypes.LINE] : lineAnimations,
        [BigChartTypes.PIE] : {},
        [BigChartTypes.SCATTERED] : {},
        [BigChartTypes.DONUT] : {},
        [BigChartTypes.RADAR] : {},
        [BigChartTypes.PORAR] : {},

    }

    const currentAnimations = animations[chartType]
    return (
        <div>
            <div className="ml-2 mb-2 text-2xl font-bold">{chartType.toUpperCase()}</div>
            <Label htmlFor={'duration'} className='font-bold hover:cursor-pointer mr-2'>Animation duration second</Label>
            <Input
                id='duration'
                placeholder='Animation Duration'
                ref={durationRef}
                type='number'
                defaultValue={1500}
            ></Input>
            
            <ScrollArea className="h-[78vh] text-xl font-black p-1 mt-2 flex flex-col">
                <div className="flex flex-col space-y-1">
                    {Object.keys(currentAnimations).map(animation => (
                        <Button
                            disabled={animationsOfChartType[chartType].name === animation}
                            key={animation}
                            className="mt-1"
                            onClick={() => {
                                setAniType(chartType, animation, durationRef.current.value)
                            }}
                        >
                            {animation}
                        </Button>
                    ))}
                </div>
            </ScrollArea>
        </div>
        
            
    )
}