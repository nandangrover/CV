module.exports = atob = (a) => {
    return new Buffer(a, 'base64').toString('binary');
};