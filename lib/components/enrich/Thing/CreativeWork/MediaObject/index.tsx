import type BaseProps from "../../../../types/index.ts"
import type { MediaObject as MediaObjectProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = MediaObjectProps & BaseProps

export default function MediaObject({
	_type = "MediaObject",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
