import type BaseProps from "../../../../types/index.ts"
import type { HyperTocProps } from "../../../../types/Thing/CreativeWork/HyperToc/index.ts"

import CreativeWork from "../index.tsx"

export type Props = HyperTocProps & BaseProps

export default function HyperToc({
	associatedMedia,
	tocEntry,
	_type = "HyperToc",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				associatedMedia,
				tocEntry,
				...subtypeProperties,
			}}
		/>
	)
}
