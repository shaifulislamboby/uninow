function extractCourseInfo (txtArr) {
  const data = {
    name: '',
    course: '',
    degree: '',
    averageGrade: ''
  }

  // loop and set
  for (const line of txtArr) {
    const txt = line.trim().split(':')
    if (txt.length < 2) {
      continue
    }

    const key = txt[0].trim()
    const content = txt.slice(1).join(' ').trim()

    switch (key) {
      case 'Name':
        data.name = content
        break
      case 'Course':
        data.course = content
        break
      case 'Degree':
        data.degree = content
        break
      case 'AverageGrade':
        data.averageGrade = content
        break
    }
  }

  return data
}

exports = module.exports = extractCourseInfo
