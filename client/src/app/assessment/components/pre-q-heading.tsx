const PreQHeading = ({ heading }: { heading: string }) => (
  <div className="relative mb-5">
    <div className="absolute inset-0 flex items-center">
      <span className="w-full border-t border-border" />
    </div>
    <div className="relative flex justify-start text-sm">
      <span className="bg-foreground pr-4 text-sm font-bold">{heading}</span>
    </div>
  </div>
)

export default PreQHeading
