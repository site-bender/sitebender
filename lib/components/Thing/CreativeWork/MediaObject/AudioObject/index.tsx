import type BaseProps from "../../../../../types/index.ts"
import type { AudioObject as AudioObjectProps } from "../../../../../types/index.ts"

import MediaObject from "../index.tsx"

export type Props = AudioObjectProps & BaseProps

export default function AudioObject({
	_type = "AudioObject",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
