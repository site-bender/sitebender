import type BaseProps from "../../../../../../types/index.ts"
import type { BuddhistTemple as BuddhistTempleProps } from "../../../../../../types/index.ts"

import PlaceOfWorship from "../index.tsx"

export type Props = BuddhistTempleProps & BaseProps

export default function BuddhistTemple({
	_type = "BuddhistTemple",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
