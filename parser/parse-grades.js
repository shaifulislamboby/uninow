/**
 * Parse table content for course and grade info
 * sample content of txtArr
 * {
            "id": "0102",
            "name": "Logik",
            "semester": "20171",
            "grade": "5,0",
            "status": "Nicht bestanden",
            "note": "Nicht erschienen",
            "date": "2017/04/09"
    },
 * @param txtArr
 */
function parseGrades(txtArr) {
    if (txtArr.length !== 7) {
        return null;
    }

    // add data
    const data = {
        id: txtArr[0].trim(),
        name: txtArr[1].trim(),
        semester: txtArr[2].trim(),
        grade: txtArr[3].trim(),
        status: txtArr[4].trim(),
        note: txtArr[5].trim(),
        date: txtArr[6].trim()
    };

    return data;
}

exports = module.exports = parseGrades;