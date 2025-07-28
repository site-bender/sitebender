import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

import ConversationComponent from "../../../../../components/Thing/CreativeWork/Conversation/index.tsx"

export interface ConversationProps {
}

type Conversation =
	& Thing
	& CreativeWorkProps
	& ConversationProps

export default Conversation
