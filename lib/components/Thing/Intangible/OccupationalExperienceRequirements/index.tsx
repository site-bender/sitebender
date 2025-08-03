import type BaseProps from "../../../../types/index.ts"
import type { OccupationalExperienceRequirements as OccupationalExperienceRequirementsProps } from "../../../../types/index.ts"

import Intangible from "../index.tsx"

export type Props = OccupationalExperienceRequirementsProps & BaseProps

export default function OccupationalExperienceRequirements({
	_type = "OccupationalExperienceRequirements",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
