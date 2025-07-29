import type BaseProps from "../../../../types/index.ts"
import type ClaimProps from "../../../../types/Thing/CreativeWork/Claim/index.ts"

import CreativeWork from "../index.tsx"

export type Props = ClaimProps & BaseProps

export default function Claim({
	appearance,
	claimInterpreter,
	firstAppearance,
	_type = "Claim",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				appearance,
				claimInterpreter,
				firstAppearance,
				...subtypeProperties,
			}}
		/>
	)
}
