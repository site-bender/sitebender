import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageProps } from "../index.ts"

import ProfilePageComponent from "../../../../../../components/Thing/CreativeWork/WebPage/ProfilePage/index.tsx"

export interface ProfilePageProps {
}

type ProfilePage =
	& Thing
	& CreativeWorkProps
	& WebPageProps
	& ProfilePageProps

export default ProfilePage
