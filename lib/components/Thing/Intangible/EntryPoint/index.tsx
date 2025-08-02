import type BaseProps from "../../../../types/index.ts"
import type EntryPointProps from "../../../../types/Thing/Intangible/EntryPoint/index.ts"

import Intangible from "../index.tsx"

export type Props = EntryPointProps & BaseProps

export default function EntryPoint({
	actionApplication,
	actionPlatform,
	application,
	contentType,
	encodingType,
	httpMethod,
	urlTemplate,
	_type = "EntryPoint",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				actionApplication,
				actionPlatform,
				application,
				contentType,
				encodingType,
				httpMethod,
				urlTemplate,
				...subtypeProperties,
			}}
		>
			{children}
		</Intangible>
	)
}
