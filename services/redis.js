async function initRedis(options) {
    const { createClient } = require("redis");
    const connectOptions = {};
    if (!options) {
        throw new Error("redis connect options not found")
    }
    if (typeof options === 'string') {
        connectOptions.url = options;
    } else if (options.url) {
        connectOptions.url = options.url;
    } else {
        connectOptions.socket = {
            host: options.host || 'localhost',
            port: options.port || 6379
        }
        connectOptions.username = options.username || 'default';
        options.password && (connectOptions.password = options.password);
    }
    const client = createClient(connectOptions).on('error', (err) => {
        if (err instanceof Error) {
            throw err;
        } else {
            throw new Error(err);
        }
    });
    await client.connect();
    console.log("Connected successfully to redis")
    function pushList(key, value) {
        return client.rPushX(key, value)
    }
    function setList(key, value = []) {
        if (value.length < 1) {
            return Promise.reject(new Error("can not set empty array to " + key))
        }
        return client.rPush(key, value)
    }
    function getList(key) {
        return client.lRange(key, 0, -1);
    }
    function removeElement(key, value, num = 0) {
        return client.lRem(key, num, value);
    }
    function getIndex(key, index) {
        return client.lIndex(key, index);
    }
    function setValue(key, value) {
        return client.set(key, value);
    }
    function getValue(key) {
        return client.get(key);
    }
    async function setObject(key, obj) {
        let clone = Object.assign({}, obj);
        for (const field in obj) {
            let res = await client.hSet(key, field, obj[field]);
            clone[field] = res;
        }
        return clone;
    }
    function setObjectValue(key, paramName, paramValue) {
        return client.hSet(key, paramName, paramValue);
    }
    async function getObject(key, field) {
        if (field) {
            return await client.hGet(key, field);
        } else
            return Object.assign({}, await client.hGetAll(key));
    }
    function delField(key, field) {
        return client.hDel(key, field)
    }
    function objExistsField(key, field) {
        return client.hExists(key, field)
    }
    function setPush(key, value) {
        return client.sAdd(key, value);
    }
    function setExists(key, value) {
        return client.sIsMember(key, value);
    }
    function setGetAll(key) {
        return client.sMembers(key)
    }
    function setRemove(key, value) {
        return client.sRem(key, value)
    }
    function setLength(key) {
        return client.sCard(key)
    }
    function removeKey(key) {
        return client.del(key)
    }
    function existsKey(key) {
        return client.exists(key)
    }
    return {
        string: {
            setValue,
            getValue
        },
        array: {
            pushList, setList, getList,
            removeElement,
            getIndex
        },
        hash: {
            setObject,
            setObjectValue,
            getObject,
            delField,
            objExistsField
        },
        set: {
            setExists,
            setGetAll,
            setLength,
            setRemove,
            setPush
        },
        removeKey,
        existsKey,
        closeConn: () => client.quit()
    }
}
module.exports = { initRedis }
