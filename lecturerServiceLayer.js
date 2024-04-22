const { getAlllecturerData, addlecturer, deletelecturer, updatelecturer } = require("./lecturerDataLayer");


async function getAlllecturers() {
  const lecturers = await getAlllecturerData();
    return lecturers;
}

async function addNewlecturer(full_name, gender, email, phone_number, department, specialization, years_of_experience) {
    const results = await addlecturer(full_name, gender, email, phone_number, department, specialization, years_of_experience);
    return {
        'success': true,
    }

}

async function deleteDesireLecturer(id) {
    await deletelecturer(id)
    return {
        'success': true,
        'message': 'lecturer has been deleted'
    }
}

async function updateDesireLecturer(id,updatedData) {
    await updatelecturer(id,updatedData);
    return {
        'success': true,
        'message': 'lecturer has been updated'
    }
}
module.exports = { getAlllecturers, addNewlecturer, deleteDesireLecturer, updateDesireLecturer};