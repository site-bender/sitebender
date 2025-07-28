import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../types/Thing/CreativeWork/index.ts"
import type { HyperTocEntryProps } from "../../../../types/Thing/CreativeWork/HyperTocEntry/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	HyperTocEntryProps,
	"HyperTocEntry",
	ExtractLevelProps<ThingProps, CreativeWorkProps>
>

export default function HyperTocEntry({
	associatedMedia,
	tocContinuation,
	utterances,
	schemaType = "HyperTocEntry",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				associatedMedia,
				tocContinuation,
				utterances,
				...subtypeProperties,
			}}
		/>
	)
}
