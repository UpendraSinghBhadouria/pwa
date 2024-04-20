import { Icons } from "@/components/icons"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import Link from "next/link"

const EditDrawer = ({ onClick }: { onClick?: () => void }) => (
  <Drawer>
    <DrawerTrigger className="text-celadon-green font-medium text-lg absolute cursor-pointer right-5 top-[-52px]">
      <Icons.delete />
    </DrawerTrigger>
    <DrawerContent className="border-none bg-white flex flex-col items-center">
      <DrawerHeader>
        <DrawerTitle className="text-lg font-semibold text-black text-center">
          Are you sure you want to delete ?
        </DrawerTitle>
        <DrawerDescription className="text-dark-charcoal text-center">
          Once deleted it cannot be recovered
        </DrawerDescription>
      </DrawerHeader>
      <DrawerFooter className="w-full gap-4">
        <button
          onClick={onClick && onClick}
          className="w-full bg-celadon-green h-12 rounded-lg flex items-center justify-center text-base font-medium text-white"
        >
          Delete
        </button>
        <DrawerClose>
          <button className="w-full bg-white border-philippine-silver border-[1px] h-12 rounded-lg text-base font-medium text-granite-gray">
            No don’t delete
          </button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
)

export default EditDrawer
