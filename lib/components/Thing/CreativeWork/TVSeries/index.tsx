import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../types/Thing/CreativeWork/index.ts"
import type { TVSeriesProps } from "../../../../types/Thing/CreativeWork/TVSeries/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	TVSeriesProps,
	"TVSeries",
	ExtractLevelProps<ThingProps, CreativeWorkProps>
>

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
	schemaType = "TVSeries",
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
		/>
	)
}
