import type BaseProps from "../../../../../../types/index.ts"
import type RadioSeriesProps from "../../../../../../types/Thing/Intangible/Series/CreativeWorkSeries/RadioSeries/index.ts"

import CreativeWorkSeries from "../index.tsx"

// RadioSeries adds no properties to the ListItem schema type
export type Props = RadioSeriesProps & BaseProps

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
		_type = "RadioSeries",
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
		>
			{children}
		</CreativeWorkSeries>
	)
}
