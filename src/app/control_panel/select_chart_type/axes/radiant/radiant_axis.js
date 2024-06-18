import chartController from "@/app/zustand_chart_controller";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RadiantLineController from "./line_controller";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import RadiantDotController from "./dot_controller";
import { isRadiant } from "@/lib/utils";
import { BigChartTypes } from "@/app/chart-parts-provider";

export default function RadiantAxis() {
    const {chartType, radarElementsFill, changeRadarElementsFill, radarScale} = chartController()
    return (
        <>
        {isRadiant(chartType)? 
        <>
            {chartType === BigChartTypes.RADAR? 
                <div className="flex mb-3">
                    <Checkbox
                            id={'fillRadar'}
                            className='mr-2'
                            checked={radarElementsFill.line.fill}
                            onCheckedChange={(checked) => {
                                const isFilled = { ...radarElementsFill }
                                isFilled.line.fill = checked
                                changeRadarElementsFill(isFilled)
                            }}
                    />
                    <Label htmlFor={'fillRadar'} className='font-bold hover:cursor-pointer mr-2'>Fill inner lines</Label>
                </div> 
            : ''}

                {chartType === BigChartTypes.RADAR ?
                <div className="rounded-md border-2 p-3 mb-4">
                    <Tabs defaultValue="ticks">
                        <TabsList className='grid w-full grid-cols-2 my-1'>
                            <TabsTrigger value='ticks'>Ticks</TabsTrigger>
                            <TabsTrigger value = 'pointLabels'>Point labels</TabsTrigger>
                        </TabsList>
                        <TabsContent value='ticks'>
                            <RadiantDotController dot='ticks'/>
                        </TabsContent>

                        <TabsContent value='pointLabels'>
                            <RadiantDotController dot='pointLabels'/>
                        </TabsContent>
                    </Tabs>
                </div>
                 : 
                 <div className="mb-4">
                    <RadiantDotController dot='ticks'/>
                 </div>
                
                }
            
            
            <div className="rounded-md border-2 p-3">
                <Tabs defaultValue="angleLines">
                    <TabsList className='grid w-full grid-cols-2 my-1'>
                        <TabsTrigger value='angleLines'>Angle lines</TabsTrigger>
                        <TabsTrigger value = 'grid'>Grid lines</TabsTrigger>
                    </TabsList>
                    <TabsContent value='angleLines'>
                        <RadiantLineController line='angleLines'></RadiantLineController>
                    </TabsContent>

                    <TabsContent value='grid'>
                        <RadiantLineController line='grid'></RadiantLineController>
                    </TabsContent>
                </Tabs>
            </div>
        </>
        : ''
        }
        </>
    )
}