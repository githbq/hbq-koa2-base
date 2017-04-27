export default (route, { controller }) => {
    //标准分页的写法   使用路径参数
    route.get('/page/:pageSize/:pageIndex', controller.page)
    route.get('/insert', controller.insert)
    route.get('/save', controller.save)
}