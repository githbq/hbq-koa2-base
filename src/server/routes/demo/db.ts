export default (route, { controller }) => { 
    route.post('/:_id', controller.add)
    route.delete('/:_id', controller.delete)
    route.put('/:_id', controller.update)
    route.get('/page/:pageSize/:pageIndex', controller.getPage)
    route.get('/:_id', controller.getById)
}