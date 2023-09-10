

export const isValid = (object, validations) => {
    const results = {};
    let valid = true;
    Object.keys(validations).forEach(property => {
        const func = validations[property];
        const result = validations[property](object, property);
        valid = valid && result;
        results[property] = result;
    })
    return { isValid: valid, results: results };
}

export const nonEmpty = () => {
    return (object, property) => {
        const valid = !!object[property];
        return valid;
    }
}
