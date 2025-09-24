import type BaseProps from "../../../../../../types/index.ts"
import type { Aquarium as AquariumProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = AquariumProps & BaseProps

export default function Aquarium({
	_type = "Aquarium",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
