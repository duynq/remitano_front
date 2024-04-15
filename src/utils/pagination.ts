export const MORE_PAGE = '...'

/**
 * Generate pagination.
 * @param {number} currentPage Current page.
 * @param {number} totalPage Total page.
 * @param {number} offset width.
 * @returns {Array} Returns array of pages.
 * Reference https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
 */

export const paginationGenerator = (
  currentPage: number,
  totalPage: number,
  offset = 2,
) => {
  // By doing this, when we are close to the beginning or end of the pagination, two numbers are generated after/before the current page,
  // but when we are far from these points (in the middle of the pagination), we generate only one number after/before the current page.
  const offsetNumber =
    currentPage <= offset || currentPage > totalPage - offset
      ? offset
      : offset - 1
  const numbersList = []
  const numbersListWithDots: (string | number)[] = []

  // If itemsPerPage is less than what the user selected with the Select component or if there is no page or only one page:
  if (totalPage <= 1 || totalPage === undefined) return [1]

  // Create list of numbers:
  numbersList.push(1)
  for (
    let i = currentPage - offsetNumber;
    i <= currentPage + offsetNumber;
    i++
  ) {
    if (i < totalPage && i > 1) {
      numbersList.push(i)
    }
  }
  numbersList.push(totalPage)

  // Add three dots to the list of numbers:
  numbersList.reduce((accumulator, currentValue) => {
    if (accumulator === 1) {
      numbersListWithDots.push(accumulator)
    }
    if (currentValue - accumulator !== 1) {
      numbersListWithDots.push(MORE_PAGE)
    }
    numbersListWithDots.push(currentValue)

    return currentValue
  })

  return numbersListWithDots
}

/**
 *
 * @param {Number} totalItems
 * @param {Number} pageSize
 * @returns {Number} total page
 */
export const getTotalPages = (totalItems: number, pageSize: number) => {
  return Math.ceil(totalItems / pageSize)
}
