import type BaseProps from "../../../../types/index.ts"
import type CreativeWorkSeasonProps from "../../../../types/Thing/CreativeWork/CreativeWorkSeason/index.ts"

import CreativeWork from "../index.tsx"

export type Props = CreativeWorkSeasonProps & BaseProps

export default function CreativeWorkSeason({
	actor,
	director,
	endDate,
	episode,
	episodes,
	numberOfEpisodes,
	partOfSeries,
	productionCompany,
	seasonNumber,
	startDate,
	trailer,
	_type = "CreativeWorkSeason",
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
				director,
				endDate,
				episode,
				episodes,
				numberOfEpisodes,
				partOfSeries,
				productionCompany,
				seasonNumber,
				startDate,
				trailer,
				...subtypeProperties,
			}}
		>{children}</CreativeWork>
	)
}
