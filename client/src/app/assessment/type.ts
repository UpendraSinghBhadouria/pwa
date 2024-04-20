export type Options = string

export type Validity = "correct" | "wrong" | "default"

export type OptionCatagories = "partial" | "full"

export type Answer = {
  selectedOption?: { id: string; label: string; value: string }
  optionValue?: Options
}
