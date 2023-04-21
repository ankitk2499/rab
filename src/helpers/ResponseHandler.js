export function objectToArray(keys, data) {
    let resultArray = [];
    data.map((item) => {
        let singleArray = [];
        keys.map((key) => {
            singleArray.push(item[key]);
            return 0;
        })
        resultArray.push(singleArray);
        return 0;
    })
    return resultArray
}
