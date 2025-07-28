import type BaseProps from "../../../../../types/index.ts"
import type { RadioSeriesProps } from "../../../../../types/Thing/CreativeWork/CreativeWorkSeries/RadioSeries/index.ts"

import CreativeWorkSeries from "../index.tsx"

export type Props = RadioSeriesProps & BaseProps

export default function RadioSeries({
	actor,
	actors,
	containsSeason,
	director,
	directors,
	episode,
	episodes,
	musicBy,
	numberOfEpisodes,
	numberOfSeasons,
	productionCompany,
	season,
	seasons,
	trailer,
	_type = "RadioSeries",
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
				containsSeason,
				director,
				directors,
				episode,
				episodes,
				musicBy,
				numberOfEpisodes,
				numberOfSeasons,
				productionCompany,
				season,
				seasons,
				trailer,
				...subtypeProperties,
			}}
		/>
	)
}
