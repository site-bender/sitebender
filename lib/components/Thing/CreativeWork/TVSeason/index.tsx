import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../types/Thing/CreativeWork/index.ts"
import type { TVSeasonProps } from "../../../../types/Thing/CreativeWork/TVSeason/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	TVSeasonProps,
	"TVSeason",
	ExtractLevelProps<ThingProps, CreativeWorkProps>
>

export default function TVSeason({
	countryOfOrigin,
	partOfTVSeries,
	titleEIDR,
	schemaType = "TVSeason",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				countryOfOrigin,
				partOfTVSeries,
				titleEIDR,
				...subtypeProperties,
			}}
		/>
	)
}
