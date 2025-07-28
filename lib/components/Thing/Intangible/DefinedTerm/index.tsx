import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { DefinedTermProps } from "../../../../types/Thing/Intangible/DefinedTerm/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	DefinedTermProps,
	"DefinedTerm",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

export default function DefinedTerm({
	inDefinedTermSet,
	termCode,
	schemaType = "DefinedTerm",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				inDefinedTermSet,
				termCode,
				...subtypeProperties,
			}}
		/>
	)
}
