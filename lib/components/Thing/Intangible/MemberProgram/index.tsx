import type BaseProps from "../../../../types/index.ts"
import type { MemberProgramProps } from "../../../../types/Thing/Intangible/MemberProgram/index.ts"

import Intangible from "../index.tsx"

export type Props = MemberProgramProps & BaseProps

export default function MemberProgram({
	hasTiers,
	hostingOrganization,
	_type = "MemberProgram",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				hasTiers,
				hostingOrganization,
				...subtypeProperties,
			}}
		/>
	)
}
