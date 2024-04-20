import ProfileFromDataProvider from "@/store/profile-form-provider"
import PageRenderer from "./components/page-renderer"

export default async function Profile() {
  return (
    <ProfileFromDataProvider>
      <div className="px-5 pt-2 pb-4 text-black h-profile">
        <PageRenderer />
      </div>
    </ProfileFromDataProvider>
  )
}
