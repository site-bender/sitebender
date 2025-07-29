import type BaseProps from "../../../../../types/index.ts"
import type DigitalPlatformEnumerationProps from "../../../../../types/Thing/Intangible/Enumeration/DigitalPlatformEnumeration/index.ts"

import Enumeration from "../index.tsx"

export type Props = DigitalPlatformEnumerationProps & BaseProps

export default function DigitalPlatformEnumeration({
	_type = "DigitalPlatformEnumeration",
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
