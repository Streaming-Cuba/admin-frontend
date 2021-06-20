import React from "react";
import {Redirect} from "react-router";
import {Paths} from "../index"

export default function RedirectToDashboard (): JSX.Element {
    return (
        <Redirect
            to={{
                pathname: Paths.Dashboard ,
                state: {
                    from: "/",
                },
            }}
        />
    )
}