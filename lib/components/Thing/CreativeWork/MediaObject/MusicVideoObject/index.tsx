import type BaseProps from "../../../../../types/index.ts"
import type { MusicVideoObject as MusicVideoObjectProps } from "../../../../../types/index.ts"

import MediaObject from "../index.tsx"

export type Props = MusicVideoObjectProps & BaseProps

export default function MusicVideoObject({
	_type = "MusicVideoObject",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
