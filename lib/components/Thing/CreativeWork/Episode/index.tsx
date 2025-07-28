import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../types/Thing/CreativeWork/index.ts"
import type { EpisodeProps } from "../../../../types/Thing/CreativeWork/Episode/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	EpisodeProps,
	"Episode",
	ExtractLevelProps<ThingProps, CreativeWorkProps>
>

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
	schemaType = "Episode",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
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
