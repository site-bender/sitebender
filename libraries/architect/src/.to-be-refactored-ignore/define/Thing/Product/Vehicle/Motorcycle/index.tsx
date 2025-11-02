import type BaseProps from "../../../../../../types/index.ts"
import type { Motorcycle as MotorcycleProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = MotorcycleProps & BaseProps

export default function Motorcycle({
	_type = "Motorcycle",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
