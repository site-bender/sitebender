import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../types/Thing/CreativeWork/index.ts"
import type { DefinedTermSetProps } from "../../../../../types/Thing/CreativeWork/DefinedTermSet/index.ts"
import type { CategoryCodeSetProps } from "../../../../../types/Thing/CreativeWork/DefinedTermSet/CategoryCodeSet/index.ts"

import DefinedTermSet from "../index.tsx"

export type Props = BaseComponentProps<
	CategoryCodeSetProps,
	"CategoryCodeSet",
	ExtractLevelProps<ThingProps, CreativeWorkProps, DefinedTermSetProps>
>

export default function CategoryCodeSet({
	hasCategoryCode,
	schemaType = "CategoryCodeSet",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<DefinedTermSet
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				hasCategoryCode,
				...subtypeProperties,
			}}
		/>
	)
}
