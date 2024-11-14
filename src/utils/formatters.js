// import Column from "~/pages/Boards/BoardContent/ListColumns/Column/Column"

export const capitalizeFirstLetter = (val) => {
    if (!val) return ''
    return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
  }
/**
   * Cách Xử Lý bug logic thư viện Dnd-Kit khi Column là rỗng:
   * - Phía FE sẽ tự tạo ra một cái card đặc biệt: Placeholder Card, không liên quan tới Back-End
   * Card Đặc biệt này sẽ đượ ẩn ở giao diện UI người dùng.
   * Cấu trúc Id của card này để Unique rất đơn giản, không ần phải random phức tạp:
   * "columnId-placeholder-card" ( mõi mỗicolumn chỉ cso thể có ối đa một Placeholder Card)
   * Quan trọng khi tạo : phải đầy đủ : (_id, _boadrdId, columnId, FE_PlaceholderCard)
*/

export const generatePlaceholderCard = (column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true
  }
}