//自动挂载其他文件并注入io对象
const requireHelper = appUtils.requireCommon('requireHelper')
export default (io, { debug }) => {
    requireHelper.requireDir(__dirname, (socket) => {
        socket && socket(io, { debug })
    })
}