import * as rewrite from 'koa-rewrite'
export default () => {
    return [
        rewrite('/index.html', '/'),
        rewrite('/editor', '/editor.html')
    ]
}
