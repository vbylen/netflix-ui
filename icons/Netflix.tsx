import * as React from "react"
import Svg, { Path } from "react-native-svg"

export function Netflix(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="22px"
            height="22px"
            {...props}
        >
            <Path d="M14 44.15l9-1.28v-4.38l-9-30zm13-25.29L23 6.29V6H15.35L23 31.51l3.43 11.43 5.95.7.18.02 2.44.35-.02-.07zM27 6v6.29l9 28.28V6z"
                fill={props.isActive ? props.color : 'transparent'}
                stroke={props.isActive ? 'transparent' : props.color}
                strokeWidth={props.isActive ? 0 : 4}
            />
        </Svg>
    )
}

