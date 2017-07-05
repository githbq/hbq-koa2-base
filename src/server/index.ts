// Initialize the inits directory where the file name starts with init and needs to return an object with the init method otherwise it will not be initialized
export default {
    async init(app, { debug }) {
        const requireHelper = appUtils.requireCommon('requireHelper')
        const inits = []
        requireHelper.requireDir([__dirname, 'inits'], (item, name) => {
            if (name.match(/^init/) && item && item.init) {
                inits.push(item)
            }
        })
        for (let item of inits) {
            await item.init(app, { debug })
        }
    }
}