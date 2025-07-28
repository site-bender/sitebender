import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { PropertyProps } from "../../../../types/Thing/Intangible/Property/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	PropertyProps,
	"Property",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

export default function Property({
	domainIncludes,
	inverseOf,
	rangeIncludes,
	supersededBy,
	schemaType = "Property",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				domainIncludes,
				inverseOf,
				rangeIncludes,
				supersededBy,
				...subtypeProperties,
			}}
		/>
	)
}
