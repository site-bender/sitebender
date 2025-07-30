import type BaseProps from "../../../../../types/index.ts"
import type ResearchProjectProps from "../../../../../types/Thing/Organization/Project/ResearchProject/index.ts"

import Project from "../index.tsx"

export type Props = ResearchProjectProps & BaseProps

export default function ResearchProject({
	_type = "ResearchProject",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Project
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</Project>
	)
}
