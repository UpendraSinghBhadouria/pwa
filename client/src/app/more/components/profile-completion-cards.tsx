import { Icons } from "@/components/icons"
import Link from "next/link"
import { profileCompletionCardsConfig } from "./constants"

type ProfileCompletionCard = {
  heading: string
  subHeading: string
  icon: string
  iconDescription: string
  href: string
}

const Card = ({
  heading,
  href,
  icon,
  iconDescription,
  subHeading,
}: ProfileCompletionCard) => {
  const Icon = Icons[icon as keyof typeof Icons]

  return (
    <Link
      href={href}
      className="min-w-[255px] h-[103px] bg-white p-[18px] overflow-hidden relative flex flex-col gap-1 rounded-[10px]"
    >
      <p className="font-medium text-lg text-eerie-black">{heading}</p>
      <p className="font-medium text-xs text-granite-gray">{subHeading}</p>

      <div className="absolute right-0 top-0 flex items-center justify-center">
        <Icons.profileStar className="" />
        <div className="absolute mt-3 ml-3 flex flex-col items-center">
          <Icon />
          <p className="font-medium text-sm text-dark-liver">
            {iconDescription}
          </p>
        </div>
      </div>
    </Link>
  )
}

const ProfileCompletionCards = () => {
  return (
    <div className="flex mb-7 gap-3 overflow-scroll px-5 no-scrollbar">
      {profileCompletionCardsConfig.map(({ ...rest }, idx) => (
        <Card key={idx} {...rest} />
      ))}
    </div>
  )
}

export default ProfileCompletionCards
