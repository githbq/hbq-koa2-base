// Automatically mount other files and inject io objects
const requireHelper = appUtils.requireCommon('requireHelper')
export default (io, { debug }) => {
    requireHelper.requireDir(__dirname, (socket) => {
        socket && socket(io, { debug })
    })
}