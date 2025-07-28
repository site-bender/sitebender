import type { BaseComponentProps, ExtractLevelProps } from "../../../../../../types/index.ts"
import type ThingProps from "../../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../../types/Thing/Action/index.ts"
import type { AssessActionProps } from "../../../../../../types/Thing/Action/AssessAction/index.ts"
import type { ReactActionProps } from "../../../../../../types/Thing/Action/AssessAction/ReactAction/index.ts"
import type { EndorseActionProps } from "../../../../../../types/Thing/Action/AssessAction/ReactAction/EndorseAction/index.ts"

import ReactAction from "../index.tsx"

export type Props = BaseComponentProps<
	EndorseActionProps,
	"EndorseAction",
	ExtractLevelProps<ThingProps, ActionProps, AssessActionProps, ReactActionProps>
>

export default function EndorseAction({
	endorsee,
	schemaType = "EndorseAction",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<ReactAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				endorsee,
				...subtypeProperties,
			}}
		/>
	)
}
