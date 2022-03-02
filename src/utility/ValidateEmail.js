/**
 * Validate email. The given input must follow a simple email format.
 * @param email email to validate.
 * @returns {boolean} valid = true, inValid = false
 */
export default function validateEmail(email) {
    const regex = ".+\\@.+\\..+";
    let pattern = new RegExp(regex);
    return pattern.test(email);
};