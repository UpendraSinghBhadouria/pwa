const ForesightCard = ({
  description,
  children,
  stats,
}: {
  stats: string
  description: string
  children: React.ReactNode
}) => {
  return (
    <div className="flex gap-2 items-center">
      {children}
      <div className="flex flex-col justify-between">
        <div className="font-medium text-sm">{stats}</div>
        <div className="text-xs text-primary-foreground">{description}</div>
      </div>
    </div>
  )
}

export default ForesightCard
