import MoreOptionsCard from "./components/more-options-card"
import ProfileCompletionCards from "./components/profile-completion-cards"
import ProfileSection from "./components/profile-section"
import SocialNavbar from "./components/social-media-nav"

export default async function More() {
  return (
    <div className="pb-24">
      <ProfileSection />
      <p className="mt-6 font-semibold text-[20px] text-eerie-black px-5 mb-3">
        Complete your profile
      </p>
      <ProfileCompletionCards />
      <div className="px-5 ">
        <MoreOptionsCard />
        <SocialNavbar />
      </div>
    </div>
  )
}
