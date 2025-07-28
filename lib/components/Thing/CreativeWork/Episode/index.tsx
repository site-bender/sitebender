import type BaseProps from "../../../../types/index.ts"
import type { EpisodeProps } from "../../../../types/Thing/CreativeWork/Episode/index.ts"

import CreativeWork from "../index.tsx"

export type Props = EpisodeProps & BaseProps

export default function Episode({
	actor,
	actors,
	director,
	directors,
	duration,
	episodeNumber,
	musicBy,
	partOfSeason,
	partOfSeries,
	productionCompany,
	trailer,
	_type = "Episode",
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
				director,
				directors,
				duration,
				episodeNumber,
				musicBy,
				partOfSeason,
				partOfSeries,
				productionCompany,
				trailer,
				...subtypeProperties,
			}}
		/>
	)
}
