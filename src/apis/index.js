import axios from "axios"
import { API_ROOT } from "~/utils/constants"

/**
 * 
Lưu ý: Đối với việc sử dụng axios 
* Tất cả các function bên dưới các bạn sẽ thấy mình chỉ request và lấy data từ reponse luôn, mà không có try catch hay then catch gì đề bắt lời.

* Lý do là vì ở phía Front-end chúng ta không cần thiết làm như vậy đối với mọi request bởi nó sẽ gây ra việc dư thừa code catch lỗi quá nhiều.

* Giải pháp Clean Code gọn gàng đó là chúng ta sẽ catch lỗi tập trung tại một nơi bằng cách tận dụng một thứ cực kỳ mạnh mẽ trong axios đó là Interceptors

* Hiều đơn giản Interceptors là cách mà chúng ta sẽ đánh chận vào giữa request hoặc response đề xử lý logic mà chúng ta muồn.

 */

export const fetchBoardDetailsAPI = async (boardId) => {
    const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
    // Lưu ý : axios sẽ trả về kết quả qua property của nó là data
    return response.data
}