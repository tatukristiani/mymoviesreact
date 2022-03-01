
// Used to validate username and password. Extremely simple validation.
export default function validateCredential(credentialToValidate) {
    // Regex accepts usernames and passwords that contain 4-20 characters that contain only letters and numbers.
    let regex = /^[a-zA-Z0-9]{4,20}$/;
    let pattern = new RegExp(regex);
    return pattern.test(credentialToValidate);
}