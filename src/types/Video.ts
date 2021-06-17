import Demographic from "./Demographic";
import ParsedDemographic from "./ParseDemographic";

type Video = {
    id?: number,
    title?: string,
    date: string,
    reach: number,
    views: number,
    length: number
    duration?: string,
    more?: string,
    demographic: Demographic,
    parsedDemographic?: ParsedDemographic
}
export default Video