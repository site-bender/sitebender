export default function byNumericDialingCode(a, b){
	const aNum = parseInt(a.replace(/\D/g, ""))
	const bNum = parseInt(b.replace(/\D/g, ""))
	return aNum - bNum
}
