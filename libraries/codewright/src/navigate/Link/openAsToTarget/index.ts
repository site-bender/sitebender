import type { Props } from "../index.tsx"

export default function openAsToTarget(
	openAs: Props["openAs"],
): string | undefined {
	switch (openAs) {
		case "newTab":
			return "_blank"
		case "parentTab":
			return "_parent"
		case "originalTab":
			return "_top"
		default:
			return undefined
	}
}
