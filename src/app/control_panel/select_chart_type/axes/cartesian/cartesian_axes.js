"use client"

import chartController from "@/app/zustand_chart_controller"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AxesController from "./axes_controller"
import { isCartesian } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

export default function CartesianController() {
    const {chartType, indexAxis, changeIndexAxis, cartesianScale, changeCartesianScale} = chartController()
    return (
        <>
        {isCartesian(chartType) ?
        <div>
            <Tabs 
                defaultValue = {indexAxis === 'x' ? 'vertical' : 'horizontal'} 
                onValueChange={(value) => {
                    const newIndexAxis = value === 'vertical' ? 'x' : 'y'
                    const newType = { ...cartesianScale }
                    const tmpY = cartesianScale.y.type
                    newType.y.type = cartesianScale.x.type
                    newType.x.type = tmpY
                    changeCartesianScale(newType)
                    changeIndexAxis(newIndexAxis)
                }}>
                <TabsList className='grid w-full grid-cols-2 my-1'>
                    <TabsTrigger value='vertical'>Vertical</TabsTrigger>
                    <TabsTrigger value = 'horizontal'>Horizontal</TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="hover:cursor-pointer mt-3 ml-2">
                <Checkbox
                id={'barStack'}
                checked={cartesianScale.y.stacked}
                onCheckedChange={(checked) => {
                    const newStacked = { ...cartesianScale }
                    newStacked.x.stacked = checked
                    newStacked.y.stacked = checked
                    changeCartesianScale(newStacked)
                }}
                className='mr-2'></Checkbox>
                <label 
                  htmlFor={'barStack'}
                  className="text-sm hover:cursor-pointer"
                >Stacked Chart</label>
            </div>

            <div className="mt-2 rounded-md border-2 p-2">
                <Tabs defaultValue = 'x'>
                    <TabsList className='grid w-full grid-cols-2 my-1'>
                        <TabsTrigger value='x'>X</TabsTrigger>
                        <TabsTrigger value = 'y'>Y</TabsTrigger>
                    </TabsList>
                    <TabsContent value='x'>
                        <AxesController axis='x'></AxesController>
                    </TabsContent>
                    <TabsContent value='y'>
                        <AxesController axis='y'></AxesController>
                    </TabsContent>
                </Tabs>
            </div>            
        </div>
            
        : ''
        }
        </>
    )
}