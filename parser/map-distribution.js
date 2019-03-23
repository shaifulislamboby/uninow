function mapDistribution (courseInfoArr) {
  const distributions = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 }
  for (const courseInfo of courseInfoArr) {
    if (!courseInfo.hasOwnProperty('grade')) {
      continue
    }

    const gradePointRounded = Math.ceil(parseFloat(courseInfo.grade, 10))

    if (distributions.hasOwnProperty(gradePointRounded)) {
      distributions[gradePointRounded] += 1
    } else {
      distributions[gradePointRounded] = 1
    }
  }

  const distributionArr = Object.keys(distributions).map((key) => {
    return { key, value: distributions[key] }
  }).sort((el1, el2) => {
    if (el1.key < el2.key) {
      return -1
    }

    if (el1.key > el2.key) {
      return 1
    }

    return 0
  })

  return distributionArr
}

exports = module.exports = mapDistribution
