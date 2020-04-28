
export function insertItem(array, action) {
    return [
        ...array.slice(0, action.index),
        action.item,
        ...array.slice(action.index)
    ]
}

export function removeItem(array, index) {
    return [...array.slice(0, index), ...array.slice(index + 1)]
}
