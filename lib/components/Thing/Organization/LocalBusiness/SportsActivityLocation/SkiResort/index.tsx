import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type SkiResortProps from "../../../../../../types/Thing/SkiResort/index.ts"
import type SportsActivityLocationProps from "../../../../../../types/Thing/SportsActivityLocation/index.ts"

import SportsActivityLocation from "../index.tsx"

// SkiResort adds no properties to the SportsActivityLocation schema type
export type Props = BaseComponentProps<
	SkiResortProps,
	"SkiResort",
	ExtractLevelProps<SkiResortProps, SportsActivityLocationProps>
>

export default function SkiResort({
	schemaType = "SkiResort",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<SportsActivityLocation
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
