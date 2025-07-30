import type BaseProps from "../../../../../types/index.ts"
import type MobileApplicationProps from "../../../../../types/Thing/CreativeWork/SoftwareApplication/MobileApplication/index.ts"

import SoftwareApplication from "../index.tsx"

export type Props = MobileApplicationProps & BaseProps

export default function MobileApplication({
	carrierRequirements,
	_type = "MobileApplication",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<SoftwareApplication
			{...props}
			_type={_type}
			subtypeProperties={{
				carrierRequirements,
				...subtypeProperties,
			}}
		>{children}</SoftwareApplication>
	)
}
