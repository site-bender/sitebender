import type BaseProps from "../../../../../../types/index.ts"
import type { MedicalTrialDesign as MedicalTrialDesignProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = MedicalTrialDesignProps & BaseProps

export default function MedicalTrialDesign({
	_type = "MedicalTrialDesign",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
