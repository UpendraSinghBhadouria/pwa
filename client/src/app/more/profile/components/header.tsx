import { Icons } from "@/components/icons"
import Link from "next/link"

const Header = () => {
  return (
    <div className="h-[65px] flex items-center gap-2">
      <Link href="/">
        <Icons.leftArrow className="w-7 h-7" />
      </Link>
      <h1 className="font-medium text-lg">Rankings</h1>
    </div>
  )
}

export default Header
