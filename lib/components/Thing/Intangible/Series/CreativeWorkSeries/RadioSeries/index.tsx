import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type CreativeWorkSeriesProps from "../../../../../../types/Thing/CreativeWorkSeries/index.ts"
import type RadioSeriesProps from "../../../../../../types/Thing/RadioSeries/index.ts"

import CreativeWorkSeries from "../index.tsx"

export type Props = BaseComponentProps<
	RadioSeriesProps,
	"RadioSeries",
	ExtractLevelProps<RadioSeriesProps, CreativeWorkSeriesProps>
>

export default function RadioSeries(
	{
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
		schemaType = "RadioSeries",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWorkSeries
			{...props}
			schemaType={schemaType}
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
