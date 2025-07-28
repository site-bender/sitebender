import type BaseProps from "../../../../types/index.ts"
import type { AtlasProps } from "../../../../types/Thing/CreativeWork/Atlas/index.ts"

import CreativeWork from "../index.tsx"

export type Props = AtlasProps & BaseProps

export default function Atlas({
	_type = "Atlas",
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
