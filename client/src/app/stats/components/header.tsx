import ProgressCard from "./progress-card"

const Header = () => {
  return (
    <div className="fixed w-[380px] h-[350px] bg-stats overflow-hidden bg-fixed bg-[center_top_60px] overflow-y-scroll no-scrollbar bg-no-repeat bg-red-50 text-primary px-5 rounded-b-[32px] pb-5">
      <div className="absolute top-[70px]  bg-[url('/stars.png')] bg-center bg-no-repeat w-full left-0 h-[285px] rounded-b-[32px]" />
      <div className="h-[65px] flex items-center">
        <h1 className="font-medium text-lg">Stats</h1>
      </div>
      <ProgressCard />
    </div>
  )
}

export default Header
