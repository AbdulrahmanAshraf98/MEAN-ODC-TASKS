const checkValidArray = (array) => {
	if (array === null || array.length === 0) return false;
	return true;
};
const getIndexOfElement = (array, key, value) => {
	const validArray = checkValidArray(array);
	if (!validArray || !key || !value) return null;
	return array.findIndex((item) => item[key] === value);
};
const getElementBy = (array, key, value) => {
	const validArray = checkValidArray(array);
	if (!validArray || !key || !value) return null;
	const element = array.find((item) => item[key] === value);
	return element ? element : null;
};
const deleteElementFromArray = (array, key, value) => {
	const validArray = checkValidArray(array);
	if (!validArray || !key || !value) return [];
	const newArray = array.filter((item) => item[key] !== value);
	return newArray;
};
const sortArrayBy = (
	array,
	type = "normalArray",
	key = "",
	keyType = "string",
	sortOrder = "asc",
) => {
	if (!key) return array.sort();
	if (type === "normalArray")
		return sortOrder === "asc"
			? array.sort((a, b) => a - b)
			: array.sort((a, b) => b - a);
	if (type === "arrayOfObject")
		if (keyType === "string") {
			return sortOrder === "asc"
				? array.sort((a, b) => a[key].localeCompare(b[key]))
				: array.sort((a, b) => a[key].localeCompare(b[key]));
		}
	return sortOrder === "asc"
		? array.sort((a, b) => a[key] - b[key])
		: array.sort((a, b) => b[key] - a[key]);
};
const searchForStringInArray = (
	array,
	value,
	typeOFArray = "normalArray",
	key = "",
) => {
	if (typeOFArray === "arrayOfObject")
		return array.filter((element) =>
			element[key].trim().toLowerCase().includes(value.trim().toLowerCase()),
		);
	return array.filter((element) =>
		element.trim().toLowerCase().includes(value.trim().toLowerCase()),
	);
};

module.exports = {
	getIndexOfElement,
	getElementBy,
	deleteElementFromArray,
	sortArrayBy,
	searchForStringInArray,
};
