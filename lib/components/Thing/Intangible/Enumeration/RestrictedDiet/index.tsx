import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type RestrictedDietProps from "../../../../../types/Thing/RestrictedDiet/index.ts"

import Enumeration from "../index.tsx"

// RestrictedDiet adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	RestrictedDietProps,
	"RestrictedDiet",
	ExtractLevelProps<RestrictedDietProps, EnumerationProps>
>

export default function RestrictedDiet({
	schemaType = "RestrictedDiet",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Enumeration
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
