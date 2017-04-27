 /**
  * 案例代码
  * mongoose  mongoose
  * Schema   Schema
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
                 return this.c_add({ name: 'lucy' })
             },
             deleteById(id) {
                 return this.find({
                     '_id': id
                 }).remove().exec()
             },
             getTitleById(id) {
                 let data = this.c_findById(id)
                 return data.then((result) => { return result ? result.title : '' })
             },
             add() {
                 var x = this.update({}, { name: 'hanmeimei' }, { multi: true }, () => {
                     console.log('update')
                 })
                 var model = new this({ name: Math.random() + 'lili' })
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
             },
             deleteById(id) {
                 return this.find({
                     '_id': id
                 }).remove().exec()
             }
         }
     }
 }