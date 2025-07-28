import type BaseProps from "../../../../../types/index.ts"
import type { PhysicalActivityCategoryProps } from "../../../../../types/Thing/Intangible/Enumeration/PhysicalActivityCategory/index.ts"

import Enumeration from "../index.tsx"

export type Props = PhysicalActivityCategoryProps & BaseProps

export default function PhysicalActivityCategory({
	_type = "PhysicalActivityCategory",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Enumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
