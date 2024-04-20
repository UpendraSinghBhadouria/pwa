import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { profileSectionConfig } from "./constants"

type AvatarProps = {
  progress: number
  avatar: {
    src?: string
    initials?: string
  }
}

const CircularProgressBar = ({ progress }: { progress: number }) => {
  const calculateStrokeDashoffset = (progress: number) => {
    const steps = Math.floor(progress / 10)
    const offsetValues = [370, 350, 330, 300, 280, 250, 230, 200, 190, 100]
    const index = Math.min(steps, offsetValues.length - 1)
    return offsetValues[index - 1]
  }

  const strokeDashoffset = calculateStrokeDashoffset(progress)

  return (
    <div className="relative w-24 h-24">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-crystal stroke-current"
          strokeWidth="15"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
        ></circle>
        <circle
          className="text-eucalyptus progress-ring-circle stroke-current"
          strokeWidth="15"
          strokeLinecap="round"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          strokeDashoffset={strokeDashoffset}
        ></circle>
      </svg>
    </div>
  )
}

const Avatar = ({ avatar, progress }: AvatarProps) => {
  return (
    <div className="relative">
      <CircularProgressBar progress={progress} />
      <div className="h-[88px] absolute top-6 left-6">
        <div
          className={cn(
            "relative h-12 w-12 flex items-center rounded-full justify-center overflow-hidden",
            avatar?.initials && `bg-pastel-yellow`
          )}
        >
          {avatar?.src ? (
            <Image src={avatar.src} alt="profile-img" layout="fill" />
          ) : (
            <p className="text-[20px] font-semibold text-skobeloff">
              {avatar.initials}
            </p>
          )}
        </div>

        <div className="px-[6px] border-[2px] w-fit h-[22px] rounded-sm border-alice-blue flex items-center bg-eerie-black mt-1">
          {progress}%
        </div>
      </div>
    </div>
  )
}

const ProfileSection = () => {
  const { name, ...rest } = profileSectionConfig

  return (
    <div className="h-[138px] flex bg-more px-5 py-7 gap-4 text-white items-center">
      <Avatar {...rest} />
      <div>
        <p className="font-semibold text-[22px]">{name}</p>
        <Link href="/more/profile" className="flex items-center">
          <p className="font-medium gap-2">Edit</p>
          <Icons.rightArrow className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}

export default ProfileSection
