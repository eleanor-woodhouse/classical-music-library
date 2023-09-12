import axios, { AxiosResponse } from "axios"
import querystring from "querystring"

type RequestBody = {
  grant_type: string
  code: string
  redirect_uri: string
}

type Headers = {
  "content-type": string
  Authorization: string
}

export async function getSpotifyAccessToken(reqBody: RequestBody, headers: Headers): Promise<any> {
  const response = await axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: querystring.stringify(reqBody),
    headers,
  })

  return response
}

export async function getAlbumData(token: string): Promise<AxiosResponse> {
  const albumData = await axios({
    method: "get",
    url: "https://api.spotify.com/v1/me/albums",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      limit: 50,
      offset: 49,
    },
  })
  return albumData
}
