import type BaseProps from "../../../../../../types/index.ts"
import type MovieTheaterProps from "../../../../../../types/Thing/Organization/LocalBusiness/EntertainmentBusiness/MovieTheater/index.ts"

import EntertainmentBusiness from "../index.tsx"

// MovieTheater adds no properties to the ListItem schema type
export type Props = MovieTheaterProps & BaseProps

export default function MovieTheater(
	{
		screenCount,
		_type = "MovieTheater",
		children,
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<EntertainmentBusiness
			{...props}
			_type={_type}
			subtypeProperties={{
				screenCount,
				...subtypeProperties,
			}}
		>
			{children}
		</EntertainmentBusiness>
	)
}
