import pathOr from "../pathOr"

const path = (path) => (source) => {
	return pathOr(path)()(source)
}

export default path
