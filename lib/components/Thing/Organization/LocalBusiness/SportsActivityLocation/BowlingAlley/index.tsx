import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type BowlingAlleyProps from "../../../../../../types/Thing/BowlingAlley/index.ts"
import type SportsActivityLocationProps from "../../../../../../types/Thing/SportsActivityLocation/index.ts"

import SportsActivityLocation from "../index.tsx"

// BowlingAlley adds no properties to the SportsActivityLocation schema type
export type Props = BaseComponentProps<
	BowlingAlleyProps,
	"BowlingAlley",
	ExtractLevelProps<BowlingAlleyProps, SportsActivityLocationProps>
>

export default function BowlingAlley({
	schemaType = "BowlingAlley",
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
