import Video from "./Video";

type VideosInfo = {
    videos_count: number,
    total_reach: number,
    total_views: number,
    total_countries: number,
    total_regions: number,
    videos: Video[],
    rankingByRegion: {[key: string]: number},
    rankingByCountry: {[key: string]: number}
}

export default VideosInfo