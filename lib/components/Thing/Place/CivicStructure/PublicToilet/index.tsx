import type BaseProps from "../../../../../types/index.ts"
import type { PublicToilet as PublicToiletProps } from "../../../../../types/index.ts"

import CivicStructure from "../index.tsx"

export type Props = PublicToiletProps & BaseProps

export default function PublicToilet({
	_type = "PublicToilet",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
