import type BaseProps from "../../../../../types/index.ts"
import type { ResearcherProps } from "../../../../../types/Thing/Intangible/Audience/Researcher/index.ts"

import Audience from "../index.tsx"

export type Props = ResearcherProps & BaseProps

export default function Researcher({
	_type = "Researcher",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Audience
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
