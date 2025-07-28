import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { EnumerationProps } from "../../../../types/Thing/Intangible/Enumeration/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	EnumerationProps,
	"Enumeration",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

export default function Enumeration({
	supersededBy,
	schemaType = "Enumeration",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				supersededBy,
				...subtypeProperties,
			}}
		/>
	)
}
