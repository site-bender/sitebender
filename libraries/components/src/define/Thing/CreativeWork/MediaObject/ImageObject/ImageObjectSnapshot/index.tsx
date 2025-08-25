import type BaseProps from "../../../../../../../types/index.ts"
import type { ImageObjectSnapshot as ImageObjectSnapshotProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = ImageObjectSnapshotProps & BaseProps

export default function ImageObjectSnapshot({
	_type = "ImageObjectSnapshot",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
