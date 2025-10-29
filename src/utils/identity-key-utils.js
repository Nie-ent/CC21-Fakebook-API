export default function (identity) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10,15}$/

    const identityKey = emailRegex.test(identity)
        ? 'email' : mobileRegex.test(identity) ? 'mobile' : ''

    return identityKey


}