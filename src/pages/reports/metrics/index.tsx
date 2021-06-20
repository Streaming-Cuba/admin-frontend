import React from "react";
import {useTypedSelector} from "../../../redux";
import {List, ListItem} from "@material-ui/core";

export default function MetricsReport (): JSX.Element {

    const videos = useTypedSelector(state => state.metrics.videos)

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