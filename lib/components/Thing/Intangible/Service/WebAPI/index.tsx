import type BaseProps from "../../../../../types/index.ts"
import type WebAPIProps from "../../../../../types/Thing/Intangible/Service/WebAPI/index.ts"

import Service from "../index.tsx"

export type Props = WebAPIProps & BaseProps

export default function WebAPI({
	documentation,
	_type = "WebAPI",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Service
			{...props}
			_type={_type}
			subtypeProperties={{
				documentation,
				...subtypeProperties,
			}}
		>
			{children}
		</Service>
	)
}
