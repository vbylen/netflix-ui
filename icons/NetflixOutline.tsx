import * as React from "react"
import Svg, { Path } from "react-native-svg"

export function NetflixOutline(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="22px"
            height="22px"
            {...props}
        >
            <Path
                fill={props.color}
                d="M27 6v10.75L23.48 6H14v38.15l9-1.28V32.58l3.24 10.34 6.14.72 3.62.51V6h-9zm2 2h5v30.13l-5-15.27V8zM17.39 8h4.64l.97 2.96 4 12.22 2 6.12 4.06 12.4-.54-.06-4.76-.56-.76-2.42-4-12.76-2-6.38L17.39 8zM21 41.13l-5 .72V10.24l5 15.96v14.93z" />
        </Svg>
    )
}

