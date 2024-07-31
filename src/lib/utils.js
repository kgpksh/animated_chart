import { BigChartTypes } from "@/app/chart/chart-parts-provider"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const canStack = [BigChartTypes.BAR, BigChartTypes.LINE, BigChartTypes.SCATTERED]
export function isCartesian( chartType) {
  return canStack.includes(chartType)
}

const raidants = [BigChartTypes.RADAR, BigChartTypes.PORAR]
export function isRadiant( chartType) {
  return raidants.includes(chartType)
}