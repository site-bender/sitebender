import type BaseProps from "../../../../types/index.ts"
import type TVSeriesProps from "../../../../types/Thing/CreativeWork/TVSeries/index.ts"

import CreativeWork from "../index.tsx"

export type Props = TVSeriesProps & BaseProps

export default function TVSeries({
	actor,
	actors,
	containsSeason,
	countryOfOrigin,
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
	titleEIDR,
	trailer,
	_type = "TVSeries",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				actor,
				actors,
				containsSeason,
				countryOfOrigin,
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
				titleEIDR,
				trailer,
				...subtypeProperties,
			}}
		>
			{children}
		</CreativeWork>
	)
}
