/**
 * 活动
 */
export default (router, { controller }) => {
    router.get('/:type', controller.bindAction('getEnumByType'))
} 