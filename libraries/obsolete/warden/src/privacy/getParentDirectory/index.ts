//++ Get parent directory of a path
export default function getParentDirectory(path: string) {
	return function () {
		return path.substring(0, path.lastIndexOf("/"))
	}
}
