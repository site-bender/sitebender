import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../types/Thing/CreativeWork/index.ts"
import type { ArchiveComponentProps } from "../../../../types/Thing/CreativeWork/ArchiveComponent/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	ArchiveComponentProps,
	"ArchiveComponent",
	ExtractLevelProps<ThingProps, CreativeWorkProps>
>

export default function ArchiveComponent({
	holdingArchive,
	itemLocation,
	schemaType = "ArchiveComponent",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				holdingArchive,
				itemLocation,
				...subtypeProperties,
			}}
		/>
	)
}
