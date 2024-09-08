import axios from "axios"

export const PRIMARY_COLOR = "#007555"
export const placeholderImgUrl =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"

export const fetchProducts = (page = 1, search = "", limit = 10) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://stageapi.monkcommerce.app/task/products/search?search=${search}&page=${page}&limit=${limit}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "72njgfa948d9aS7gs5",
          },
        }
      )
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  })
}
