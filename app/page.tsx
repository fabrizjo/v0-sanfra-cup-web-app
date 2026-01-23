import { HomePageClient } from "@/components/home-page-client"
import { getBothRegistrationsStatus } from "@/lib/registrations"

export default async function HomePage() {
  const registrationsStatus = await getBothRegistrationsStatus()

  return (
    <HomePageClient 
      calcioRegistrationsOpen={registrationsStatus.calcio} 
      volleyRegistrationsOpen={registrationsStatus.volley} 
    />
  )
}
