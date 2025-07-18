import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"
import type MemberProgramProps from "../../../../types/Thing/MemberProgram/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	MemberProgramProps,
	"MemberProgram",
	ExtractLevelProps<MemberProgramProps, IntangibleProps>
>

export default function MemberProgram(
	{
		hasTiers,
		hostingOrganization,
		schemaType = "MemberProgram",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				hasTiers,
				hostingOrganization,
				...subtypeProperties,
			}}
		/>
	)
}
