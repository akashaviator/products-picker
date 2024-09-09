import axios from "axios"

export const PRIMARY_COLOR = "#007555"
export const IMG_URL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"

export const fetchProductsAPI = (page = 1, search, limit = 10) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://stageapi.monkcommerce.app/task/products/search?search=${
          search || ""
        }&page=${page}&limit=${limit}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.REACT_APP_API_KEY,
          },
        }
      )
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  })
}
export const EMPTY_PRODUCT = { id: `${new Date()}`, variants: [] }
