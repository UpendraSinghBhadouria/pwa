import { cn } from "@/lib/utils"
import {
  SelectContent,
  SelectItem,
  SelectPrimitive,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

type SelectProps = {
  label: string
  options: { value: string; label: string }[]
  onChange: (val: string) => void
  placeholder: string
  value: string
}

const Select = ({
  value,
  label,
  options,
  onChange,
  placeholder,
}: SelectProps) => {
  return (
    <div>
      <label className="text-charcoal font-medium ">{label}</label>
      <SelectPrimitive value={value} onValueChange={onChange}>
        <SelectTrigger
          className={cn(
            "text-black input-shadow mt-1 flex h-10 w-full rounded-[8px] border border-chinese-silver bg-white p-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-granite-gray focus-visible:outline-none focus-visible:border-celadon-green focus-visible:bg-azureish-white disabled:bg-light-silver disabled:cursor-not-allowed disabled:text-granite-gray"
          )}
        >
          <SelectValue
            className={cn(!!value ? "text-black" : "text-granite-gray")}
            placeholder={placeholder}
          />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ value, label }, index) => (
            <SelectItem className="text-balance" key={index} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectPrimitive>
    </div>
  )
}

export default Select
