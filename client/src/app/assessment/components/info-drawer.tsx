"use client"

import { Icons } from "@/components/icons"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"

const InfoCards = ({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) => {
  const Icon = Icons[icon as keyof typeof Icons]

  return (
    <div className="flex gap-[11px] items-center">
      <div className="bg-azureish-white w-12 h-12 flex rounded-[10px] justify-center items-center">
        <Icon />
      </div>
      <div className="flex flex-col">
        <p className="font-semibold">{title}</p>
        <p>{description}</p>
      </div>
    </div>
  )
}

const Foresight = () => {
  return (
    <>
      <div>
        <p className="font-medium text-xl mb-2">Overview</p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
      <Separator className="my-5 bg-skobeloff" />
      <div>
        <div className="flex gap-2 mb-5">
          <div className="rounded-full bg-crayola h-6 w-6 flex justify-center items-center">
            <span className="font-semibold text-black text-[10px]">FS</span>
          </div>
          <div className="flex flex-col gap-2 text-sm font-medium text-white">
            <div className="flex gap-2 items-center">
              <Icons.rightArrow className="w-3 h-3" />
              <p>Attitude Essentials</p>
            </div>
            <div className="flex gap-2 items-center">
              <Icons.rightArrow className="w-3 h-3" />
              <p>Integrity & Ethics</p>
            </div>
          </div>
        </div>
        <p>
          This section shows from which topics the next question will come from.
        </p>
      </div>
      <Separator className="my-5 bg-skobeloff" />
      <div className="flex flex-col gap-8">
        <div>
          <div className="flex items-center gap-[6px]">
            <p className="text-lg font-semibold">Avg. time</p>
            <Icons.clock className="text-rackley w-4 h-4" />
          </div>
          <p className="text-sm">
            Average time taken by a user to answer the upcoming question
          </p>
        </div>
        <div>
          <div className="flex items-center gap-[6px]">
            <p className="text-lg font-semibold">Accuracy</p>
            <Icons.target className="text-rackley w-4 h-4 stroke-rackley" />
          </div>
          <p className="text-sm">
            Average accuracy % users who attempted the the upcoming question
          </p>
        </div>
        <div>
          <div className="flex items-center gap-[6px]">
            <p className="text-lg font-semibold">Time limit</p>
            <Icons.timeLimit className="w-4 h-4 fill-rackley stroke-rackley" />
          </div>
          <p className="text-sm">
            Total time given to attempt the upcoming question
          </p>
        </div>
      </div>
    </>
  )
}

const PowerUps = () => {
  const powerUpsConfig = [
    {
      icon: "info4Plus",
      title: "+4 seconds",
      description: "Lorem Ipsum is simply dummy text of the printing and ",
    },
    {
      icon: "info8Plus",
      title: "+8 seconds ",
      description: "Lorem Ipsum is simply dummy text of the printing and ",
    },
    {
      icon: "info2X",
      title: "Twice Up",
      description: "Lorem Ipsum is simply dummy text of the printing and ",
    },
    {
      icon: "info3X",
      title: "Thrice Up",
      description: "Lorem Ipsum is simply dummy text of the printing and ",
    },
    {
      icon: "infoDice",
      title: "Dice Up",
      description: "Lorem Ipsum is simply dummy text of the printing and ",
    },
  ]

  return (
    <>
      <div>
        <p className="font-medium text-xl mb-2">Overview</p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
      <Separator className="my-5 bg-skobeloff" />
      <div className="flex flex-col gap-9">
        {powerUpsConfig.map(({ ...rest }, idx) => (
          <InfoCards key={idx} {...rest} />
        ))}
      </div>
    </>
  )
}

const WildCard = () => {
  const wildCardConfig = [
    {
      icon: "infoHalf",
      title: "Better Half",
      description: "Lorem Ipsum is simply dummy text of the printing and ",
    },
    {
      icon: "infoCharts",
      title: "Chosen One ",
      description: "Lorem Ipsum is simply dummy text of the printing and ",
    },
    {
      icon: "infoHeart",
      title: "Double edge",
      description: "Lorem Ipsum is simply dummy text of the printing and ",
    },
    {
      icon: "infoTime",
      title: "Time Machine",
      description: "Lorem Ipsum is simply dummy text of the printing and ",
    },
    {
      icon: "infoAba",
      title: "Ask ABA",
      description: "Lorem Ipsum is simply dummy text of the printing and ",
    },
  ]

  return (
    <>
      <div>
        <p className="font-medium text-xl mb-2">Overview</p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
      <Separator className="my-5 bg-skobeloff" />
      <div className="flex flex-col gap-9">
        {wildCardConfig.map(({ ...rest }, idx) => (
          <InfoCards key={idx} {...rest} />
        ))}
      </div>
    </>
  )
}

const InfoDrawer = ({ onClick }: { onClick?: () => void }) => {
  const [tabVal, setTabVal] = useState<"foresight" | "power-ups" | "wildcards">(
    "foresight"
  )

  return (
    <Drawer>
      <DrawerTrigger>
        <Icons.info className="text-philippine-silver w-4 h-4 cursor-pointer" />
      </DrawerTrigger>
      <DrawerContent className="border-none bg-eagle-green p-5">
        <DrawerHeader className="w-full p-0 mb-5">
          <DrawerTitle className="text-2xl font-medium text-white text-left">
            Trumps information
          </DrawerTitle>
        </DrawerHeader>
        <Tabs defaultValue={tabVal}>
          <div className="flex w-full gap-2 items-center justify-center">
            <TabsList className="bg-dark-slate-gray w-full">
              <TabsTrigger
                className="w-1/3 text-base font-medium"
                onClick={() => setTabVal("foresight")}
                value="foresight"
              >
                Foresight
              </TabsTrigger>
              <TabsTrigger
                className="w-1/3 text-base font-medium"
                onClick={() => setTabVal("power-ups")}
                value="power-ups"
              >
                Power Ups
              </TabsTrigger>
              <TabsTrigger
                className="w-1/3 text-base font-medium"
                onClick={() => setTabVal("wildcards")}
                value="wildcards"
              >
                Wildcards
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="bg-dark-slate-gray p-5 mt-7 rounded-[10px] text-white mb-5">
            <TabsContent className="mt-0" value="foresight">
              <Foresight />
            </TabsContent>
            <TabsContent className="mt-0" value="power-ups">
              <PowerUps />
            </TabsContent>
            <TabsContent className="mt-0" value="wildcards">
              <WildCard />
            </TabsContent>
          </div>
        </Tabs>
      </DrawerContent>
    </Drawer>
  )
}
export default InfoDrawer
