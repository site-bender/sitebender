import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type SportsActivityLocationProps from "../../../../../../types/Thing/SportsActivityLocation/index.ts"
import type TennisComplexProps from "../../../../../../types/Thing/TennisComplex/index.ts"

import SportsActivityLocation from "../index.tsx"

// TennisComplex adds no properties to the SportsActivityLocation schema type
export type Props = BaseComponentProps<
	TennisComplexProps,
	"TennisComplex",
	ExtractLevelProps<TennisComplexProps, SportsActivityLocationProps>
>

export default function TennisComplex({
	schemaType = "TennisComplex",
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
