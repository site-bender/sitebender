import type BaseProps from "../../../../../../types/index.ts"
import type MovieSeriesProps from "../../../../../../types/Thing/Intangible/Series/CreativeWorkSeries/MovieSeries/index.ts"

import CreativeWorkSeries from "../index.tsx"

// MovieSeries adds no properties to the ListItem schema type
export type Props = MovieSeriesProps & BaseProps

export default function MovieSeries(
	{
		actor,
		actors,
		director,
		directors,
		musicBy,
		productionCompany,
		trailer,
		_type = "MovieSeries",
		children,
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWorkSeries
			{...props}
			_type={_type}
			subtypeProperties={{
				actor,
				actors,
				director,
				directors,
				musicBy,
				productionCompany,
				trailer,
				...subtypeProperties,
			}}
		>
			{children}
		</CreativeWorkSeries>
	)
}
