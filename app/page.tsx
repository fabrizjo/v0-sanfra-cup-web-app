import { HomePageClient } from "@/components/home-page-client"
import { getRegistrationsStatus } from "@/lib/registrations"

export default async function HomePage() {
  const registrationsOpen = await getRegistrationsStatus()

  return <HomePageClient registrationsOpen={registrationsOpen} />
}
