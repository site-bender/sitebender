import type BaseProps from "../../../../types/index.ts"
import type { MusicComposition as MusicCompositionProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = MusicCompositionProps & BaseProps

export default function MusicComposition({
	_type = "MusicComposition",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
