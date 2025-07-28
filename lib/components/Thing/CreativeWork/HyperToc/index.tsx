import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../types/Thing/CreativeWork/index.ts"
import type { HyperTocProps } from "../../../../types/Thing/CreativeWork/HyperToc/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	HyperTocProps,
	"HyperToc",
	ExtractLevelProps<ThingProps, CreativeWorkProps>
>

export default function HyperToc({
	associatedMedia,
	tocEntry,
	schemaType = "HyperToc",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				associatedMedia,
				tocEntry,
				...subtypeProperties,
			}}
		/>
	)
}
