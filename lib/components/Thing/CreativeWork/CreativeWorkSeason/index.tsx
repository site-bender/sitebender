import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type CreativeWorkSeasonProps from "../../../../types/Thing/CreativeWorkSeason/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	CreativeWorkSeasonProps,
	"CreativeWorkSeason",
	ExtractLevelProps<CreativeWorkSeasonProps, CreativeWorkProps>
>

export default function CreativeWorkSeason(
	{
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
		schemaType = "CreativeWorkSeason",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
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
		/>
	)
}
