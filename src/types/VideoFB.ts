type VideoFB = {
    id?: number,
    title?: string,
    date: string,
    reach: number,
    views: number,
    length: number
    duration?: string,
    more?: string,
    ranking_by_region: {[key: string]: number},
    ranking_by_country: {[key: string]: number},
    comments: number,
    reactions: {[key: string]: number},
    shares: number,
    crosspost_count: number
    total_view_time: number
}
export default VideoFB
