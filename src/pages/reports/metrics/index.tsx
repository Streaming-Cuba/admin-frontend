import React, {useEffect} from "react";
import {useTypedSelector} from "../../../redux";
import {List, ListItem} from "@material-ui/core";
import {useDispatch} from "react-redux";
import { clearVideos } from "../../../redux/reducers/metrics";


export default function MetricsReport (): JSX.Element {

    const videos = useTypedSelector(state => state.metrics.videos)
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(clearVideos())
        }
    })

    return (
        <>
            This is a videos report
            <List>
                {
                    videos.map( (video, index)=> (
                       <ListItem key={index}>
                           {video.title}
                       </ListItem>
                    ))
                }
            </List>
        </>
    )
}