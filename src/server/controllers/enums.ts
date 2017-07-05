/**
* Enumeration interface
*/
const { momentHelper } = appUtils.requireCommon()
export default ({ debug, logger }) => {
    return {
        async getEnumByType({ type }) {
            const allEnums = appUtils.getEnums()
            const result = type === 'all' ? allEnums : allEnums[type]
            return JSONResponse(1, result)
        },
        async getRand() {
            var randomId = Math.random();
            return JSONResponse(1, randomId);
        }
    }
}