import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { PlaceProps } from "../../../../../types/Thing/Place/index.ts"
import type { CivicStructureProps } from "../../../../../types/Thing/Place/CivicStructure/index.ts"
import type { MovieTheaterProps } from "../../../../../types/Thing/Place/CivicStructure/MovieTheater/index.ts"

import CivicStructure from "../index.tsx"

export type Props = BaseComponentProps<
	MovieTheaterProps,
	"MovieTheater",
	ExtractLevelProps<ThingProps, PlaceProps, CivicStructureProps>
>

export default function MovieTheater({
	screenCount,
	schemaType = "MovieTheater",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<CivicStructure
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				screenCount,
				...subtypeProperties,
			}}
		/>
	)
}
