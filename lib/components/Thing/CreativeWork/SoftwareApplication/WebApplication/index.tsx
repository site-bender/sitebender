import type BaseProps from "../../../../../types/index.ts"
import type WebApplicationProps from "../../../../../types/Thing/CreativeWork/SoftwareApplication/WebApplication/index.ts"

import SoftwareApplication from "../index.tsx"

export type Props = WebApplicationProps & BaseProps

export default function WebApplication({
	browserRequirements,
	_type = "WebApplication",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<SoftwareApplication
			{...props}
			_type={_type}
			subtypeProperties={{
				browserRequirements,
				...subtypeProperties,
			}}
		/>
	)
}
