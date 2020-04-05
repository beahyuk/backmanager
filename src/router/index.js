import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () =>
    import ('views/login/Login.vue')
const Register = () =>
    import ("views/login/Register.vue")
const HomePage = () =>
    import ("views/home/HomePage.vue")
const Welcome = () =>
    import ("views/home/Welcome.vue")
const Users = () =>
    import ("components/system/Users.vue")
const Sections = () =>
    import ("components/system/Sections.vue")
const Projects = () =>
    import ("components/system/Projects.vue")
const ProjectVer = () =>
    import ("components/system/ProjectVer.vue")
const TestPro = () =>
    import ("components/test/TestProject.vue")
const ModuleTest = () =>
    import ("components/test/ModuleTest.vue")
const Category4 = () =>
    import ('views/category4/Category4')
const UserManage = () =>
    import ("views/category1/UserManage")
const SectionManage = () =>
    import ("views/category1/SectionManage")
const ProjectManage = () =>
    import ("views/category1/ProjectManage")
const Version = () =>
    import ("views/category1/pages/projectmanage/Version")
const Module = () =>
    import ("views/category2/pages/testproject/Module")
const TestProject = () =>
    import ("views/category2/TestProject")
const CaseManage = () =>
    import ("views/category2/CaseManage")
const Keywords = () =>
    import ("views/category2/Keywords")
const GlobalFunc = () =>
    import ("views/category2/pages/keywords/GlobalFunc")

const Running = () =>
    import ("views/category3/Running.vue")
const TaskRunning = () =>
    import ("views/category3/TaskRunning.vue")




Vue.use(VueRouter)

const routes = [{
        path: '',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/home',
        name: 'home',
        redirect: "/welcome",
        component: HomePage,
        children: [{
                path: '/welcome',
                component: Welcome
            },
            {
                name: "usermanage",
                path: "/usermanage",
                component: Users
            },
            {
                name: "sectionmanage",
                path: "/sectionmanage",
                component: Sections
            },
            {
                name: "projectmanage",
                path: "/projectmanage",
                component: Projects
            }, {
                path: '/projectmanage/version',
                name: 'version',
                component: ProjectVer
            },
            {
                name: "testproject",
                path: "/testproject",
                component: TestPro
            },
            // 待删除的路由转换
            {
                name: "moduletest",
                path: "/testproject/moduletest",
                component: ModuleTest
            },
            {
                name: "casemanage",
                path: "/casemanage",
                component: CaseManage
            }, {
                name: "keywords",
                path: "/keywords",
                component: Keywords
            }, {
                name: "Running",
                path: "/Running",
                component: Running
            }, {
                name: "TaskRunning",
                path: "/TaskRunning",
                component: TaskRunning
            }, {
                name: "Category4",
                path: "/Category4",
                component: Category4
            }
        ]
    },
    // {
    //     path: "/系统管理",
    //     name: "category1",
    //     component: Category1,
    //     children: [{
    //             path: '',
    //             redirect: 'Cate1Welcome',
    //         },
    //         {
    //             path: 'Cate1Welcome',
    //             component: Cate2Welcome
    //         },
    //         {
    //             path: '用户管理',
    //             name: 'usermanage',
    //             component: UserManage
    //         },
    //         {
    //             path: '部门管理',
    //             name: 'sectionmanage',
    //             component: SectionManage
    //         },
    //         {
    //             path: '项目管理',
    //             name: 'projectmanage',
    //             component: ProjectManage,
    //         },
    //         {
    //             path: '项目管理/version',
    //             name: 'version',
    //             component: Version
    //         }
    //     ]
    // },
    // {
    //     path: "/测试管理",
    //     name: "category2",
    //     component: Category2,
    //     children: [{
    //             path: '',
    //             redirect: 'Cate2Welcome',
    //         },
    //         {
    //             path: 'Cate2Welcome',
    //             component: Cate2Welcome
    //         },
    //         {
    //             path: '测试项目',
    //             name: 'testproject',
    //             component: TestProject,
    //             children: []
    //         },
    //         {
    //             path: '测试项目/module',
    //             name: 'module',
    //             component: Module
    //         },
    //         {
    //             path: '用例管理',
    //             name: 'casemanage',
    //             component: CaseManage
    //         },
    //         {
    //             path: '关键字',
    //             name: 'keywords',
    //             component: Keywords
    //         },
    //         {
    //             path: '关键字/globalfunc',
    //             name: 'globalfunc',
    //             component: GlobalFunc
    //         },
    //         {
    //             path: '测试计划',
    //             name: 'testplan',
    //             component: TestPlan
    //         },
    //     ]
    // },
    // {
    //     path: "/用例执行",
    //     // name: "category3",
    //     component: Category3,
    //     children: [{
    //             path: '',
    //             redirect: 'Cate3Welcome',
    //         }, {
    //             path: 'Cate3Welcome',
    //             component: Cate3Welcome
    //         },
    //         {
    //             path: '正在执行',
    //             name: 'Running',
    //             component: Running
    //         },
    //         {
    //             path: '任务执行',
    //             name: 'TaskRunning',
    //             component: TaskRunning
    //         }, {
    //             path: '回归测试',
    //             name: 'BackTest',
    //             component: BackTest
    //         },
    //     ]
    // },
    // {
    //     path: "/结果分析",
    //     name: "category4",
    //     component: Category4
    // },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router