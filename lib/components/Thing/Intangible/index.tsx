import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../types/index.ts"
import type ThingProps from "../../../types/Thing/index.ts"
import type IntangibleProps from "../../../types/Thing/Intangible/index.ts"

import Thing from "../index.tsx"

// Intangible adds no properties to the Thing schema type
export type Props = BaseComponentProps<
	IntangibleProps,
	"Intangible",
	ExtractLevelProps<IntangibleProps, ThingProps>
>

export default function Intangible({
	schemaType = "Intangible",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Thing
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
