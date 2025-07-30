import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface ConversationProps {
	"@type"?: "Conversation"}

type Conversation = Thing & CreativeWorkProps & ConversationProps

export default Conversation
