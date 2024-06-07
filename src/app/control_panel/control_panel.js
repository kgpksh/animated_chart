import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IntegratedDataPanel from "./input_file/integrated_data_panel";

export default function ControlPanel() {
    return (
        <Tabs defaultValue="dataManagement" className="flex flex-col items-center w-96">
            <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='dataManagement'>Import Data</TabsTrigger>
                <TabsTrigger value='chartManagement'>Chart</TabsTrigger>
            </TabsList>
            <TabsContent value='dataManagement'>
                <IntegratedDataPanel/>
                </TabsContent>
            <TabsContent value='chartManagement'></TabsContent>
        </Tabs>
    )
}