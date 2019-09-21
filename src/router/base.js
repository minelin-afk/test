// import ClassManage from '../views/base/ClassManage'
// import wjg from '../views/base/ClassManage.vue'
// import ModifyPassword from '../views/base/ModifyPassword'
// import StudentManage from '../views/base/StudentManage'
// import TeacherManage from '../views/base/TeacherManage'

export default [
    {
        path: "/ClassManage",
        name: "ClassManage",
        components:{
            right:  () =>import(/* webpackChunkName: "about" */ "../views/base/ClassManage.vue")
            }
    },
    {
        path: "/ModifyPassword",
        name: "ModifyPassword",
        components:{
            right:  () =>import(/* webpackChunkName: "about" */ "../views/base/ModifyPassword.vue")
            }
    },
    {
        path: "/StudentManage",
        name: "StudentManage",
        components:{
            right:  () =>import(/* webpackChunkName: "about" */ "../views/base/StudentManage.vue")
            }
    },
    {
        path: "/TeacherManage",
        name: "TeacherManage",
        components:{
            right:  () =>import(/* webpackChunkName: "about" */ "../views/base/TeacherManage.vue")
            }
    }
]