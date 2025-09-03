export function isMacOS(): boolean {
	return Deno.build.os === "darwin"
}
