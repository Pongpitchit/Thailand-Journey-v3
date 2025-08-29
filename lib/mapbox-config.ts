"use server"

export async function getMapboxToken(): Promise<string> {
  const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

  if (!token) {
    throw new Error(
      "Mapbox access token is required. Please add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN to your environment variables in Project Settings",
    )
  }

  return token
}
