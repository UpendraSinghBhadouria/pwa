import { Icons } from "@/components/icons"
import Link from "next/link"
import { moreOptionsConfig } from "./constants"

type Options = {
  href: string
  icon: string
  label: string
  isNew?: boolean
}

const MoreOptionsCard = () => {
  return (
    <div className="rounded-[10px] bg-white p-5 flex flex-col gap-6 relative">
      {moreOptionsConfig.map(
        ({ href, icon, label, isNew = false }: Options, idx) => {
          const Icon = Icons[icon as keyof typeof Icons]

          return (
            <Link
              key={idx}
              href={href}
              className="flex gap-[10px] w-fit items-center font-medium text-granite-gray"
            >
              <Icon className="w-[18px] h-[18px]" />
              {label}
              {isNew && (
                <div className="rounded-[4px] bg-pale-blue text-sm text-eagle-green px-1 font-normal">
                  New
                </div>
              )}
            </Link>
          )
        }
      )}
      <Icons.moreAba className="absolute right-[-20px] bottom-[-100px]" />
    </div>
  )
}

export default MoreOptionsCard
