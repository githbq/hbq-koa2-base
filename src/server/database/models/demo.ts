/**
 * 案例代码 
 */
export default (mongoose, Schema) => {
    return {
        //定义mongodb的字段
        props: {
            name: {
                type: Schema.Types.String,
                required: true
            }
        },
        //静态方法
        statics: {
            save() {
                return this._add({ name: 'lucy' })
            },
            deleteById(id) {
                return this.find({
                    '_id': id
                }).remove().exec()
            },
            getTitleById(id) {
                let data = this._findById(id)
                return data.then((result) => { return result ? result.title : '' })
            },
            add() {
                let x = this.update({}, { name: 'hanmeimei' }, { multi: true }, () => {
                    console.log('update')
                })
                let model = new this({ name: Math.random() + 'lili' })
                return model.save()
            },
            getBlogById(id) {
                return this.findOne({
                    '_id': id
                }).exec()
            },
            getDemos() {
                return this.find().exec()
            },
            getLatestPosts() {
                return this
                    .find()
                    .sort('field -create_time')
                    .limit(15)
                    .find()
                    .exec()
            },
            getCategoryPosts(category) {
                return this
                    .find({
                        'category': category
                    })
                    .sort('field -create_time')
                    .exec()
            },
            getBlogsByTag(tag) {
                return this
                    .find({
                        'tags': tag
                    })
                    .sort('field -create_time')
                    .exec()
            }
        }
    }
}