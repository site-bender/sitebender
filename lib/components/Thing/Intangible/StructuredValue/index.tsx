import type BaseProps from "../../../../types/index.ts"
import type { StructuredValueProps } from "../../../../types/Thing/Intangible/StructuredValue/index.ts"

import Intangible from "../index.tsx"

export type Props = StructuredValueProps & BaseProps

export default function StructuredValue({
	_type = "StructuredValue",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
