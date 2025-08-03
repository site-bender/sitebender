import type BaseProps from "../../../../../../types/index.ts"
import type { MovieTheater as MovieTheaterProps } from "../../../../../../types/index.ts"

import EntertainmentBusiness from "../index.tsx"

// MovieTheater adds no properties to the ListItem schema type
export type Props = MovieTheaterProps & BaseProps

export default function MovieTheater({
	_type = "MovieTheater",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
