import type BaseProps from "../../../../types/index.ts"
import type PlayProps from "../../../../types/Thing/CreativeWork/Play/index.ts"

import CreativeWork from "../index.tsx"

export type Props = PlayProps & BaseProps

export default function Play({
	_type = "Play",
	children,
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
		>{children}</CreativeWork>
	)
}
