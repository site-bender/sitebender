import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageProps } from "../index.ts"

export type ContactPageType = "ContactPage"

export interface ContactPageProps {
	"@type"?: ContactPageType
}

type ContactPage = Thing & CreativeWorkProps & WebPageProps & ContactPageProps

export default ContactPage
