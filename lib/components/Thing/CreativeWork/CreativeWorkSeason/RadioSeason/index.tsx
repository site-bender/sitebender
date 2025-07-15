import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CreativeWorkSeasonProps from "../../../../../types/Thing/CreativeWorkSeason/index.ts"
import type RadioSeasonProps from "../../../../../types/Thing/RadioSeason/index.ts"

import CreativeWorkSeason from "./index.tsx"

// RadioSeason adds no properties to the CreativeWorkSeason schema type
export type Props = BaseComponentProps<
	RadioSeasonProps,
	"RadioSeason",
	ExtractLevelProps<RadioSeasonProps, CreativeWorkSeasonProps>
>

export default function RadioSeason({
	schemaType = "RadioSeason",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<CreativeWorkSeason
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
