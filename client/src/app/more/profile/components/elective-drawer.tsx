import { Icons } from "@/components/icons"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

const ElectiveDrawer = ({
  heading,
  children,
  note,
}: {
  heading: string
  note: string
  children: React.ReactNode
}) => (
  <Drawer>
    <DrawerTrigger>
      <Icons.rightArrow className="w-5 h-5 cursor-pointer" />
    </DrawerTrigger>
    <DrawerContent className="border-none bg-white flex flex-col">
      <DrawerHeader>
        <DrawerTitle className="text-2xl font-medium text-black text-left">
          {heading}
        </DrawerTitle>
      </DrawerHeader>
      {note && (
        <div className="px-5 py-2 w-full bg-english-vermillion text-white flex justify-start items-center">
          {note}
        </div>
      )}
      <div className="pt-7 p-5">{children}</div>
    </DrawerContent>
  </Drawer>
)

export default ElectiveDrawer
