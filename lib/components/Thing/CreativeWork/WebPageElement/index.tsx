import type BaseProps from "../../../../types/index.ts"
import type { WebPageElementProps } from "../../../../types/Thing/CreativeWork/WebPageElement/index.ts"

import CreativeWork from "../index.tsx"

export type Props = WebPageElementProps & BaseProps

export default function WebPageElement({
	cssSelector,
	xpath,
	_type = "WebPageElement",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				cssSelector,
				xpath,
				...subtypeProperties,
			}}
		/>
	)
}
