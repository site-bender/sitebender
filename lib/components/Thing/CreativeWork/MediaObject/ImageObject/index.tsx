import type BaseProps from "../../../../../types/index.ts"
import type { ImageObject as ImageObjectProps } from "../../../../../types/index.ts"

import MediaObject from "../index.tsx"

export type Props = ImageObjectProps & BaseProps

export default function ImageObject({
	_type = "ImageObject",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
