import type BaseProps from "../../../../../types/index.ts"
import type MovieSeriesProps from "../../../../../types/Thing/CreativeWork/CreativeWorkSeries/MovieSeries/index.ts"

import CreativeWorkSeries from "../index.tsx"

export type Props = MovieSeriesProps & BaseProps

export default function MovieSeries({
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
}: Props): JSX.Element {
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
		>{children}</CreativeWorkSeries>
	)
}
