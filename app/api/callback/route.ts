import { getAlbumData, getSpotifyAccessToken } from "@/spotify/utils"
import { encodeAsBase64 } from "../helpers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  let code: string | null
  let state: string | null
  if (req.url) {
    const { searchParams } = new URL(req.url)
    code = searchParams.get("code")
    state = searchParams.get("state")
  } else {
    code = null
    state = null
  }

  if (code && state != null) {
    const requestBody = {
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI as string,
    }

    const encoded = encodeAsBase64(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`)

    const headers = {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${encoded}`,
    }

    try {
      const response = await getSpotifyAccessToken(requestBody, headers)

      if (response.status === 200) {
        const { access_token } = response.data

        const res = await getAlbumData(access_token)

        const albumData = res.data

        // TODO Soooo it turns out spotify doesn't actually return genre after all -_-
        // Create UI to discard/choose which recordings to include in library
        // Create data mappers for raw spotify data --> my domain object
        // For now this data has currently been hard coded and manually filtered in ./data/recordingsData.ts
        console.log(albumData)

        return NextResponse.json({ message: "It's all gone well" })
      }
    } catch (e) {
      console.log("Something has gone wrong: ", e)
      return NextResponse.json({ message: "Something has gone wrong" })
    }
  }
  return NextResponse.json({ message: "Something has gone wrong" })
}
