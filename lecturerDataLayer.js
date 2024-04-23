const { getConnection } = require("./connection");


async function getAlllecturerData() {
    const connection = getConnection();

    let [lecturers] = await connection.execute(`
    Select * from lecturer
    `);
    return lecturers;

}
async function addlecturer(full_name, gender, email, phone_number, department, specialization, years_of_experience) {

    const connection = getConnection();
    const query = `INSERT INTO lecturer (full_name, gender, email, phone_number,department,specialization,years_of_experience)
    VALUES (?,?,?,?,?,?,?);`
    // get the query to test
    const [response] = await connection.execute(query, [full_name, gender, email, phone_number, department, specialization, years_of_experience]);
    return response;
}

async function deletelecturer(lecturerId) {
    const connection = getConnection();
    const checkQuery = `SELECT * FROM Majors WHERE lecturer_id = ?`;
    const [involved] = await connection.execute(checkQuery, [lecturerId]);
    if (involved.length > 0) {
        return {
            'success': false,
            'message': "Unable to delete because the customer is in a sales relationship of an employee"
        }
    }
    const query = `DELETE FROM lecturer WHERE lecturer_id = ?`;
    await connection.execute(query, [lecturerId]);
  
    return {
        'success': true,
        'message': 'lecturer has been deleted'
    }
}
 
async function updatelecturer(lecturerId, updatedData) {
    const connection = getConnection();
    const { full_name, gender, email, phone_number, department, specialization, years_of_experience } = updatedData;

    const query = `
    UPDATE lecturer 
    SET full_name = ?, 
        gender = ?, 
        email = ?, 
        phone_number = ?, 
        department = ?, 
        specialization = ?, 
        years_of_experience = ? 
    WHERE lecturer_id = ?;
  `;
    const [response] = await connection.execute(query, [
        full_name,
        gender,
        email,
        phone_number,
        department,
        specialization,
        years_of_experience,
        lecturerId,                                     // lecturer_id to update
    ]);
    if (response.affectedRows === 1) {
        return {
            success: true,
            message: 'Lecturer updated successfully',
        };
    } else {
        return {
            success: false,
            message: 'Failed to update lecturer',
        };
    }

}

module.exports = { getAlllecturerData, addlecturer, deletelecturer, updatelecturer };