import type BaseProps from "../../../../types/index.ts"
import type OccupationalExperienceRequirementsProps from "../../../../types/Thing/Intangible/OccupationalExperienceRequirements/index.ts"

import Intangible from "../index.tsx"

export type Props = OccupationalExperienceRequirementsProps & BaseProps

export default function OccupationalExperienceRequirements({
	monthsOfExperience,
	_type = "OccupationalExperienceRequirements",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				monthsOfExperience,
				...subtypeProperties,
			}}
		>
			{children}
		</Intangible>
	)
}
