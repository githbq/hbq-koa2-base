/**
 * test
 */
const { momentHelper } = appUtils.requireCommon()
export default ({ debug, logger }) => {
    // const model = APP_CONFIG.useMongodb?global.DB.models.demo:{}
    return {
        hello() {
            return 'hello'
        }
        // async add(params, query, fields) {
        //     const result = await model._add(fields)
        //     return JSONResponse(1, result)
        // },
        // async delete(params) {
        //     const result = await model._delete({ condition: params })
        //     return JSONResponse(1, result)
        // },
        // async update(params, query, fields) {
        //     const result = await model._update(params, fields)
        //     return JSONResponse(1, result)
        // },
        // async getPage(params, query) {
        //     const result = await model._getPage({ condition: query, ...params })
        //     return JSONResponse(1, result)
        // },
        // async getById({ _id }) {
        //     const result = await model._findById(_id)
        //     return JSONResponse(1, result)
        // }
    }
}