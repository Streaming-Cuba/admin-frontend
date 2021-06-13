type VideosInfo = {
    videos_count: number,
    total_reach: number,
    total_views: number,
    total_countries: number,
    total_regions: number,
    videos: [],
    rankingByRegion: {[key: string]: string},
    rankingByCountry: {[key: string]: string}
}

export default VideosInfo