import type BaseProps from "../../../../../../types/index.ts"
import type { IndividualPhysician as IndividualPhysicianProps } from "../../../../../../types/index.ts"

import Physician from "../index.tsx"

export type Props = IndividualPhysicianProps & BaseProps

export default function IndividualPhysician({
	_type = "IndividualPhysician",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
