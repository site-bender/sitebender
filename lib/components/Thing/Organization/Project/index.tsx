import type BaseProps from "../../../../types/index.ts"
import type { ProjectProps } from "../../../../types/Thing/Organization/Project/index.ts"

import Organization from "../index.tsx"

export type Props = ProjectProps & BaseProps

export default function Project({
	_type = "Project",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Organization
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
