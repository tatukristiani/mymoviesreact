

/**
 *  Used to validate username. Check if the string has between 4-20 characters.
 * @param credentialToValidate username
 * @returns {boolean} valid = true, inValid = false
 */
export default function validateCredential(credentialToValidate) {
    let regex = /^[a-zA-Z0-9]{4,20}$/;
    let pattern = new RegExp(regex);
    return pattern.test(credentialToValidate);
}