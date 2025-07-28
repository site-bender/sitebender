import type BaseProps from "../../../../types/index.ts"
import type { TVSeasonProps } from "../../../../types/Thing/CreativeWork/TVSeason/index.ts"

import CreativeWork from "../index.tsx"

export type Props = TVSeasonProps & BaseProps

export default function TVSeason({
	countryOfOrigin,
	partOfTVSeries,
	titleEIDR,
	_type = "TVSeason",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				countryOfOrigin,
				partOfTVSeries,
				titleEIDR,
				...subtypeProperties,
			}}
		/>
	)
}
