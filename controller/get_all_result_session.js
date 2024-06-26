const connection = require("../database");

const get_all_result_session = async (req, res)=> {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10; // Số lượng mục trên mỗi trang

        // Tính offset
        const offset = (page - 1) * limit;

        // Truy vấn để lấy dữ liệu cho trang hiện tại
        const [rows] = await connection.query(`SELECT * FROM session ORDER BY timeInt DESC LIMIT ?, ?`, [offset, limit]);

        // Truy vấn để lấy tổng số trang
        const [totalRows] = await connection.query(`SELECT COUNT(*) as totalRows FROM session`);
        const totalItems = totalRows[0].totalRows;
        const totalPages = Math.ceil(totalItems / limit);

        return res.json({ok: true, data: rows, totalPages: totalPages});
        
    } catch (error) {
        console.log(error);
        return res.json({ok: false});
    }
};

module.exports = get_all_result_session;
