import { Icons } from "@/components/icons"
import Link from "next/link"

const Header = () => {
  return (
    <div className="h-[65px] text-black flex items-center gap-2 mb-3">
      <Link href="/stats">
        <Icons.leftArrow className="w-7 h-7" />
      </Link>
      <h1 className="font-medium text-lg">Report</h1>
    </div>
  )
}

export default Header
