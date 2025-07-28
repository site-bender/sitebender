import type BaseProps from "../../../../../types/index.ts"
import type { GenderTypeProps } from "../../../../../types/Thing/Intangible/Enumeration/GenderType/index.ts"

import Enumeration from "../index.tsx"

export type Props = GenderTypeProps & BaseProps

export default function GenderType({
	_type = "GenderType",
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
