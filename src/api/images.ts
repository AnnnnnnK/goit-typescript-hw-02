import axios from "axios";

export async function getAllImages<T>(query: string, page: number): Promise<T> {
  const BASE_URL = "https://pixabay.com/api/";
  const response = await axios(BASE_URL, {
    params: {
      key: "40417349-5adf1a8a05d4c60245a4488c5",
      q: query,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
      page: page,
      per_page: 12,
    },
  });

  return response.data;
}
