import type BaseProps from "../../../../../../types/index.ts"
import type TVSeriesProps from "../../../../../../types/Thing/Intangible/Series/CreativeWorkSeries/TVSeries/index.ts"

import CreativeWorkSeries from "../index.tsx"

// TVSeries adds no properties to the ListItem schema type
export type Props = TVSeriesProps & BaseProps

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
		children,
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
		>
			{children}
		</CreativeWorkSeries>
	)
}
