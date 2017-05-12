/**
 * 枚举接口
 */
const { momentHelper } = appUtils.requireCommon();
export default ({ debug, logger }) => {

    return {
        async getEnumByType({ type }) {
            const allEnums = appUtils.getEnums()
            const result = type == 'all' ? allEnums : allEnums[type]
            return JSONResponse(1, result)
        }
    }
}