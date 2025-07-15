import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type CreativeWorkSeriesProps from "../../../../../../types/Thing/CreativeWorkSeries/index.ts"
import type VideoGameSeriesProps from "../../../../../../types/Thing/VideoGameSeries/index.ts"

import CreativeWorkSeries from "./index.tsx"

export type Props = BaseComponentProps<
	VideoGameSeriesProps,
	"VideoGameSeries",
	ExtractLevelProps<VideoGameSeriesProps, CreativeWorkSeriesProps>
>

export default function VideoGameSeries(
	{
		actor,
		actors,
		characterAttribute,
		cheatCode,
		containsSeason,
		director,
		directors,
		episode,
		episodes,
		gameItem,
		gameLocation,
		gamePlatform,
		musicBy,
		numberOfEpisodes,
		numberOfPlayers,
		numberOfSeasons,
		playMode,
		productionCompany,
		quest,
		season,
		seasons,
		trailer,
		schemaType = "VideoGameSeries",
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
				characterAttribute,
				cheatCode,
				containsSeason,
				director,
				directors,
				episode,
				episodes,
				gameItem,
				gameLocation,
				gamePlatform,
				musicBy,
				numberOfEpisodes,
				numberOfPlayers,
				numberOfSeasons,
				playMode,
				productionCompany,
				quest,
				season,
				seasons,
				trailer,
				...subtypeProperties,
			}}
		/>
	)
}
