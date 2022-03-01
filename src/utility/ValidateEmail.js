

export default function validateEmail(email) {
    const regex = ".+\\@.+\\..+";
    let pattern = new RegExp(regex);
    return pattern.test(email);
};