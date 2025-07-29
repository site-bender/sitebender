import type BaseProps from "../../../../../../types/index.ts"
import type WearableSizeGroupEnumerationProps from "../../../../../../types/Thing/Intangible/Enumeration/SizeGroupEnumeration/WearableSizeGroupEnumeration/index.ts"

import SizeGroupEnumeration from "../index.tsx"

export type Props = WearableSizeGroupEnumerationProps & BaseProps

export default function WearableSizeGroupEnumeration({
	_type = "WearableSizeGroupEnumeration",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<SizeGroupEnumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
