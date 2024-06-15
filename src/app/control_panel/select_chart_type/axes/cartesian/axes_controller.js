import chartController from "@/app/zustand_chart_controller"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRef } from "react"

export default function AxesController({axis}) {
    const {cartesianScale, changeCartesianScale} = chartController()
    const minRef = useRef(null)
    const maxRef = useRef(null)

    return (
        <div className="flex flex-col mt-2">
            <h5 className="text-sm">Axis type</h5>
            <div className="mt-1">
                <Select
                    onValueChange={(value) => {
                        const newType = { ...cartesianScale }
                        newType[axis].type = value
                        changeCartesianScale(newType)
                    }}
                    value={cartesianScale[axis]?.type}
                    defaultValue={cartesianScale[axis]?.type}
                >
                    <SelectTrigger>
                        <SelectValue placeholder ='Select axis type'/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Axis type</SelectLabel>
                            <SelectItem value='category'>'Category'</SelectItem>
                            <SelectItem value='linear'>Linear</SelectItem>
                            <SelectItem value='logarithmic'>Log</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            

            <h5 className="text-sm mt-2">Range</h5>
            <div className="flex mt-1 ml-2 items-center">
                <Checkbox
                    id={'min'}
                    className='mr-2'
                    checked={cartesianScale[axis]?.min === null}
                    onCheckedChange={(checked) => {
                        const newScale = { ...cartesianScale }
                        if(checked) {
                            newScale[axis].min = null
                        } else {
                            const newVal = minRef.current.value
                            if(newVal === null || newVal === '') {
                                return
                            }

                            if(isNaN(newVal)) {
                                newScale[axis].min = null
                            } else {
                                newScale[axis].min = parseFloat(newVal)
                            }
                        }
                        changeCartesianScale(newScale)
                    }}
                />
                <Label 
                    htmlFor={'min'}
                    className='font-bold hover:cursor-pointer mr-2'
                    >Auto</Label>
                <Input
                    defaultValue = {cartesianScale[axis]?.min}
                    placeholder='Min number'
                    className='w-1/2'
                    ref={minRef}
                    type='number'
                ></Input>
            </div>
            <div className="flex mt-1 ml-2 items-center">
                <Checkbox
                    id={'max'}
                    className='mr-2'
                    checked={cartesianScale[axis]?.max === null}
                    onCheckedChange={(checked) => {
                        const newScale = { ...cartesianScale }
                        if(checked) {
                            newScale[axis].max = null
                        } else {
                            const newVal = maxRef.current.value
                            if(newVal === null || newVal === '') {
                                return
                            }

                            if(isNaN(newVal)) {
                                newScale[axis].max = null
                            } else {
                                newScale[axis].max = parseFloat(newVal)
                            }
                        }
                        changeCartesianScale(newScale)
                    }}
                />
                <Label 
                    htmlFor={'max'}
                    className='font-bold hover:cursor-pointer mr-2'
                    >Auto</Label>
                <Input
                    defaultValue = {cartesianScale[axis]?.max}
                    placeholder='Max number'
                    className='w-1/2'
                    ref={maxRef}
                    type='number'
                ></Input>
            </div>
        </div>
    )
}