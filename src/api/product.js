import request from "@/utils/request";

export const getProList = (obj) => {
    const {sortPrice,categoryId, goodsName, page} = obj
    return request.get('/goods/list', {
        params: {
            sortPrice,
            categoryId,
            goodsName,
            page
        }
    })
}