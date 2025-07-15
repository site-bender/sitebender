import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type CreativeWorkSeriesProps from "../../../../../../types/Thing/CreativeWorkSeries/index.ts"
import type MovieSeriesProps from "../../../../../../types/Thing/MovieSeries/index.ts"

import CreativeWorkSeries from "./index.tsx"

export type Props = BaseComponentProps<
	MovieSeriesProps,
	"MovieSeries",
	ExtractLevelProps<MovieSeriesProps, CreativeWorkSeriesProps>
>

export default function MovieSeries(
	{
		actor,
		actors,
		director,
		directors,
		musicBy,
		productionCompany,
		trailer,
		schemaType = "MovieSeries",
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
				director,
				directors,
				musicBy,
				productionCompany,
				trailer,
				...subtypeProperties,
			}}
		/>
	)
}
