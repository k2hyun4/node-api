function calpitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
    capitalize: calpitalize
};