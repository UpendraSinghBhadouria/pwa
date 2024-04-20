import { Icons } from "@/components/icons"
import Image from "next/image"

const myRankConfig = {
  rank: "37,77,869",
  avatar: "/my-avatar.jpeg",
  stars: "5,00,000",
  name: "Jhon",
}

const MyRank = () => {
  const { avatar, rank, stars, name } = myRankConfig

  return (
    <div className="p-5 fixed w-inherit bottom-0 bg-aero-blue h-16 flex justify-between my-rank-shadow rounded-t-[10px] items-center">
      <div className="flex items-center">
        <div className="bg-middle-blue-green rounded-[10px] font-medium text-dark-charcoal text-sm py-1 px-[6px] mr-3">
          {rank}
        </div>
        <div className="rounded-full overflow-hidden border w-7 h-7 relative border-eucalyptus mr-[6px]">
          {avatar ? (
            <Image src={avatar} alt={avatar} layout="fill" />
          ) : (
            <Icons.user />
          )}
        </div>
        <p className="font-medium text-[20px] text-eerie-black">{name}</p>
      </div>
      <div className="flex items-center gap-2">
        <Icons.myRankStar />
        <p className="font-medium text-lg text-eerie-black">{stars}</p>
      </div>
    </div>
  )
}

export default MyRank
