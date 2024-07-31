import { BigChartTypes } from "@/app/chart/chart-parts-provider"
import barAnimations from "./bar"
import donutAnimations from "./donut"
import lineAnimations from "./line"
import pieAnimations from "./pie"
import polarAnimations from "./polar"
import radarAnimations from "./radar"
import scatteredAnimations from "./scattered"

const animations =  {
    [BigChartTypes.BAR] : barAnimations,
    [BigChartTypes.LINE] : lineAnimations,
    [BigChartTypes.SCATTERED] : scatteredAnimations,
    [BigChartTypes.PIE] : pieAnimations,
    [BigChartTypes.DONUT] : donutAnimations,
    [BigChartTypes.RADAR] : radarAnimations,
    [BigChartTypes.PORAR] : polarAnimations,
  }

  export default animations