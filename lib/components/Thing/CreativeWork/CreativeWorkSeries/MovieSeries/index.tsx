import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../types/Thing/CreativeWork/index.ts"
import type { CreativeWorkSeriesProps } from "../../../../../types/Thing/CreativeWork/CreativeWorkSeries/index.ts"
import type { MovieSeriesProps } from "../../../../../types/Thing/CreativeWork/CreativeWorkSeries/MovieSeries/index.ts"

import CreativeWorkSeries from "../index.tsx"

export type Props = BaseComponentProps<
	MovieSeriesProps,
	"MovieSeries",
	ExtractLevelProps<ThingProps, CreativeWorkProps, CreativeWorkSeriesProps>
>

export default function MovieSeries({
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
}): Props {
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
