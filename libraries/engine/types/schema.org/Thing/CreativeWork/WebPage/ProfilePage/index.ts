import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageProps } from "../index.ts"

export type ProfilePageType = "ProfilePage"

export interface ProfilePageProps {
	"@type"?: ProfilePageType
}

type ProfilePage = Thing & CreativeWorkProps & WebPageProps & ProfilePageProps

export default ProfilePage
