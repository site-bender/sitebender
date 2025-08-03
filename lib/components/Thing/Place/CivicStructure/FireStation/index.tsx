import type BaseProps from "../../../../../types/index.ts"
import type { FireStation as FireStationProps } from "../../../../../types/index.ts"

import CivicStructure from "../index.tsx"

export type Props = FireStationProps & BaseProps

export default function FireStation({
	_type = "FireStation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
