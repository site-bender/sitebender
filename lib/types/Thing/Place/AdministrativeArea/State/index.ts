import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { AdministrativeAreaProps } from "../index.ts"

import StateComponent from "../../../../../../components/Thing/Place/AdministrativeArea/State/index.tsx"

export interface StateProps {
}

type State =
	& Thing
	& PlaceProps
	& AdministrativeAreaProps
	& StateProps

export default State
