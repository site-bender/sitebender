import type BaseProps from "../../../../types/index.ts"
import type { WebContentProps } from "../../../../types/Thing/CreativeWork/WebContent/index.ts"

import CreativeWork from "../index.tsx"

export type Props = WebContentProps & BaseProps

export default function WebContent({
	_type = "WebContent",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
