export default function byNumericDialingCode(a: string, b: string): number {
	const aNum = parseInt(a.replace(/\D/g, ""))
	const bNum = parseInt(b.replace(/\D/g, ""))
	return aNum - bNum
}
