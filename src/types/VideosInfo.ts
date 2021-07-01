import Video from "./Video";

type VideosInfo = {
    videos_count: number,
    total_reach: number,
    total_views: number,
    total_countries: number,
    total_regions: number,
    videos: Video[],
    ranking_by_region: {[key: string]: number},
    ranking_by_country: {[key: string]: number}
}

export default VideosInfo