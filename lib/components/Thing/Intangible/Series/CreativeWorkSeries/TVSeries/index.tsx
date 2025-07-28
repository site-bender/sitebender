import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type CreativeWorkSeriesProps from "../../../../../../types/Thing/CreativeWorkSeries/index.ts"
import type TVSeriesProps from "../../../../../../types/Thing/TVSeries/index.ts"

import CreativeWorkSeries from "../index.tsx"

export type Props = BaseComponentProps<
	TVSeriesProps,
	"TVSeries",
	ExtractLevelProps<TVSeriesProps, CreativeWorkSeriesProps>
>

export default function TVSeries(
	{
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
