import type BaseProps from "../../../../types/index.ts"
import type ArchiveComponentProps from "../../../../types/Thing/CreativeWork/ArchiveComponent/index.ts"

import CreativeWork from "../index.tsx"

export type Props = ArchiveComponentProps & BaseProps

export default function ArchiveComponent({
	holdingArchive,
	itemLocation,
	_type = "ArchiveComponent",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				holdingArchive,
				itemLocation,
				...subtypeProperties,
			}}
		>{children}</CreativeWork>
	)
}
