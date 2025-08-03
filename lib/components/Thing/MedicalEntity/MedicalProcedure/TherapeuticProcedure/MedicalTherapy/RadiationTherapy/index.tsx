import type BaseProps from "../../../../../../../types/index.ts"
import type { RadiationTherapy as RadiationTherapyProps } from "../../../../../../../types/index.ts"

import MedicalTherapy from "../index.tsx"

export type Props = RadiationTherapyProps & BaseProps

export default function RadiationTherapy({
	_type = "RadiationTherapy",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
