import type BaseProps from "../../../../../../types/index.ts"
import type { IPTCDigitalSourceEnumerationProps } from "../../../../../../types/Thing/Intangible/Enumeration/MediaEnumeration/IPTCDigitalSourceEnumeration/index.ts"

import MediaEnumeration from "../index.tsx"

export type Props = IPTCDigitalSourceEnumerationProps & BaseProps

export default function IPTCDigitalSourceEnumeration({
	_type = "IPTCDigitalSourceEnumeration",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MediaEnumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
