import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type ArchiveComponentProps from "../../../../types/Thing/ArchiveComponent/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"

import CreativeWork from "./index.tsx"

export type Props = BaseComponentProps<
	ArchiveComponentProps,
	"ArchiveComponent",
	ExtractLevelProps<ArchiveComponentProps, CreativeWorkProps>
>

export default function ArchiveComponent(
	{
		holdingArchive,
		itemLocation,
		schemaType = "ArchiveComponent",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
