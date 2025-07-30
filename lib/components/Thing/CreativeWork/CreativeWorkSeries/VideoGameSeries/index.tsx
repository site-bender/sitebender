import type BaseProps from "../../../../../types/index.ts"
import type VideoGameSeriesProps from "../../../../../types/Thing/CreativeWork/CreativeWorkSeries/VideoGameSeries/index.ts"

import CreativeWorkSeries from "../index.tsx"

export type Props = VideoGameSeriesProps & BaseProps

export default function VideoGameSeries({
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
	_type = "VideoGameSeries",
	children,
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
		>{children}</CreativeWorkSeries>
	)
}
