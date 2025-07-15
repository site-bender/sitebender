import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type ClaimProps from "../../../../types/Thing/Claim/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"

import CreativeWork from "./index.tsx"

export type Props = BaseComponentProps<
	ClaimProps,
	"Claim",
	ExtractLevelProps<ClaimProps, CreativeWorkProps>
>

export default function Claim(
	{
		appearance,
		claimInterpreter,
		firstAppearance,
		schemaType = "Claim",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				appearance,
				claimInterpreter,
				firstAppearance,
				...subtypeProperties,
			}}
		/>
	)
}
