import type BaseProps from "../../../../../../types/index.ts"
import type { Artery as ArteryProps } from "../../../../../../types/index.ts"

import Vessel from "../index.tsx"

export type Props = ArteryProps & BaseProps

export default function Artery({
	_type = "Artery",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
