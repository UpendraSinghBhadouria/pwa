const AddLayout = ({
  onClick,
  children,
}: {
  onClick: () => void
  children: React.ReactNode
}) => {
  return (
    <div className="relative flex flex-col gap-5">
      <div
        onClick={onClick}
        className="text-celadon-green font-medium text-lg absolute cursor-pointer right-5 top-[-52px]"
      >
        Add
      </div>
      {children}
    </div>
  )
}

export default AddLayout
