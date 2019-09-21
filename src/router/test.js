export default [
    {
        path: "/MakeTestPaper",
        name: "MakeTestPaper",
        components:{
            right:  () =>import(/* webpackChunkName: "about" */ "../views/test/MakeTestPaper.vue")
            }
    },
    {
        path: "/TestPaperManage",
        name: "TestPaperManage",
        components:{
            right:  () =>import(/* webpackChunkName: "about" */ "../views/test/TestPaperManage.vue")
            }
    },
    {
        path: "/TestResult",
        name: "TestResult",
        components:{
            right:  () =>import(/* webpackChunkName: "about" */ "../views/test/TestResult.vue")
            }
    },
    {
        path: "/TestSetter",
        name: "TestSetter",
        components:{
            right:  () =>import(/* webpackChunkName: "about" */ "../views/test/TestSetter.vue")
            }
    }, {
        path: "/ViewTestPaper",
        name: "ViewTestPaper",
        components:{
            right:  () =>import(/* webpackChunkName: "about" */ "../views/test/ViewTestPaper.vue")
            }
    }
]