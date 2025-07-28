import type BaseProps from "../../../../../../types/index.ts"
import type { WearableSizeSystemEnumerationProps } from "../../../../../../types/Thing/Intangible/Enumeration/SizeSystemEnumeration/WearableSizeSystemEnumeration/index.ts"

import SizeSystemEnumeration from "../index.tsx"

export type Props = WearableSizeSystemEnumerationProps & BaseProps

export default function WearableSizeSystemEnumeration({
	_type = "WearableSizeSystemEnumeration",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<SizeSystemEnumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
