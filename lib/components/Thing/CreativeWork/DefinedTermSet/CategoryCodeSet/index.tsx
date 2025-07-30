import type BaseProps from "../../../../../types/index.ts"
import type CategoryCodeSetProps from "../../../../../types/Thing/CreativeWork/DefinedTermSet/CategoryCodeSet/index.ts"

import DefinedTermSet from "../index.tsx"

export type Props = CategoryCodeSetProps & BaseProps

export default function CategoryCodeSet({
	hasCategoryCode,
	_type = "CategoryCodeSet",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<DefinedTermSet
			{...props}
			_type={_type}
			subtypeProperties={{
				hasCategoryCode,
				...subtypeProperties,
			}}
		>{children}</DefinedTermSet>
	)
}
