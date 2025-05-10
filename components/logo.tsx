import Image from "next/image"

export function Logo() {
  return (
    <div className="relative w-24 h-24">
      <Image
        src="/Logo-W.png"
        alt="NIGHTSPIRE"
        fill
        className="object-contain"
        priority
      />
    </div>
  )
}
