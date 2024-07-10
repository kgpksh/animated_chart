"use client"

import chartController from "@/app/zustand_chart_controller";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRef, useState } from "react";
import barAnimations from "./bar";
import lineAnimations from "./line";
import { BigChartTypes } from "@/app/chart-parts-provider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AnimationControlPanel() {
    const [currentSelectedAnimationOfChartType, setCurrentSelectedAnimationOfChartType] = useState(
        {
            [BigChartTypes.BAR] : 'default',
            [BigChartTypes.LINE] : 'default',
            [BigChartTypes.PIE] : 'default',
            [BigChartTypes.SCATTERED] : 'default',
            [BigChartTypes.DONUT] : 'default',
            [BigChartTypes.RADAR] : 'default',
            [BigChartTypes.PORAR] : 'default',
    
        }
    )
    const durationRef = useRef(1500)
    const chartType = chartController((state) => state.chartType)
    const setAnimation = chartController((state) => state.setAnimation)

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
                            disabled={currentSelectedAnimationOfChartType[chartType] === animation}
                            key={animation}
                            className="mt-1"
                            onClick={() => {
                                const newSelectedAnimationOfChartType = {...currentSelectedAnimationOfChartType}
                                newSelectedAnimationOfChartType[chartType] = animation
                                setCurrentSelectedAnimationOfChartType(newSelectedAnimationOfChartType)
                                const delayBetweenPoints = durationRef.current.value / 4
                                const animationFunction = animations[chartType][animation]
                                const ani = animationFunction(delayBetweenPoints)
                                console.log(currentSelectedAnimationOfChartType)
                                setAnimation(ani)
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