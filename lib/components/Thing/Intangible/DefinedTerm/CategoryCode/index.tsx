import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { DefinedTermProps } from "../../../../../types/Thing/Intangible/DefinedTerm/index.ts"
import type { CategoryCodeProps } from "../../../../../types/Thing/Intangible/DefinedTerm/CategoryCode/index.ts"

import DefinedTerm from "../index.tsx"

export type Props = BaseComponentProps<
	CategoryCodeProps,
	"CategoryCode",
	ExtractLevelProps<ThingProps, IntangibleProps, DefinedTermProps>
>

export default function CategoryCode({
	codeValue,
	inCodeSet,
	schemaType = "CategoryCode",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<DefinedTerm
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				codeValue,
				inCodeSet,
				...subtypeProperties,
			}}
		/>
	)
}
