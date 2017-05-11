/**
 * 活动
 */
export default (route, { controller }) => {
    route.get('/:type', controller.bindAction('getEnumByType', (ctx) => {
        return [ctx.params.type]
    }))
} 