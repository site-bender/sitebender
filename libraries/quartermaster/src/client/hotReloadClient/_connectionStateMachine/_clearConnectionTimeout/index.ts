//++ Clears browser timeout if ID is not null (safe timeout cleanup)
export default function _clearConnectionTimeout(
	connectionTimeoutId: number | null,
) {
	return function clearConnectionTimeoutWithId(): void {
		if (connectionTimeoutId !== null) {
			clearTimeout(connectionTimeoutId)
		}
	}
}
