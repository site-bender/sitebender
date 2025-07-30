import type BaseProps from "../../../../types/index.ts"
import type EnumerationProps from "../../../../types/Thing/Intangible/Enumeration/index.ts"

import Intangible from "../index.tsx"

export type Props = EnumerationProps & BaseProps

export default function Enumeration({
	supersededBy,
	_type = "Enumeration",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				supersededBy,
				...subtypeProperties,
			}}
		>{children}</Intangible>
	)
}
