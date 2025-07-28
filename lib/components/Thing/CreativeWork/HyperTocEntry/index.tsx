import type BaseProps from "../../../../types/index.ts"
import type { HyperTocEntryProps } from "../../../../types/Thing/CreativeWork/HyperTocEntry/index.ts"

import CreativeWork from "../index.tsx"

export type Props = HyperTocEntryProps & BaseProps

export default function HyperTocEntry({
	associatedMedia,
	tocContinuation,
	utterances,
	_type = "HyperTocEntry",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				associatedMedia,
				tocContinuation,
				utterances,
				...subtypeProperties,
			}}
		/>
	)
}
