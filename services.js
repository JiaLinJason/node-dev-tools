const merge = function (...args) {
    const res = {};
    for (let i = 0; i < args.length; i++) {
        const item = args[i];
        for (const key in item) {
            res[key] = item[key];
        }
    }
    return res;
}
module.exports = merge(
    require('./services/mail'),
    require('./services/mongo'),
    require('./services/redis')
)