import Vue from "vue";
import Router from "vue-router";
import store from "@/core/services/store";

Vue.use(Router);

export default new Router({
    routes: [{
            path: "/",
            redirect: "/dashboard",
            component: () =>
                import ("@/view/layout/Layout"),
            beforeEnter: (to, from, next) => {
                !store.state.auth.isAuthenticated ? next({ name: "login" }) : next();
            },
            children: [{
                    path: "/dashboard",
                    name: "dashboard",
                    component: () =>
                        import ("@/view/pages/Dashboard.vue")
                },

                // --user--
                {
                    path: "/user",
                    name: "userTable",
                    component: () =>
                        import ("@/view/pages/user/Table.vue"),
                    beforeEnter: (to, from, next) => {
                        if (
                            store.state.auth.userType === 1
                        ) {
                            next();
                        } else {
                            next("/");
                        }
                    }
                },
                {
                    path: "/user/form",
                    name: "userFormCreate",
                    component: () =>
                        import ("@/view/pages/user/form/FormCreate.vue"),
                    beforeEnter: (to, from, next) => {
                        if (store.state.auth.userType === 1) {
                            next();
                        } else {
                            next("/");
                        }
                    }
                },
                {
                    path: "/user/form/:id",
                    name: "userFormUpdate",
                    component: () =>
                        import ("@/view/pages/user/form/FormUpdate.vue"),
                    beforeEnter: (to, from, next) => {
                        if (store.state.auth.userType === 1) {
                            next();
                        } else {
                            next("/");
                        }
                    }
                },
                {
                    path: "/customer",
                    name: "customerTable",
                    component: () =>
                        import ("@/view/pages/customer/Table.vue"),
                    beforeEnter: (to, from, next) => {
                        if (
                            store.state.auth.userType === 1
                        ) {
                            next();
                        } else {
                            next("/");
                        }
                    }
                },
                {
                    path: "/customer/form",
                    name: "customerFormCreate",
                    component: () =>
                        import ("@/view/pages/customer/form/FormCreate.vue"),
                    beforeEnter: (to, from, next) => {
                        if (store.state.auth.userType === 1) {
                            next();
                        } else {
                            next("/");
                        }
                    }
                },
                {
                    path: "/customer/form/:id",
                    name: "customerFormUpdate",
                    component: () =>
                        import ("@/view/pages/customer/form/FormUpdate.vue"),
                    beforeEnter: (to, from, next) => {
                        if (store.state.auth.userType === 1) {
                            next();
                        } else {
                            next("/");
                        }
                    }
                },
                {
                    path: "/profile",
                    name: "profile",
                    component: () =>
                        import ("@/view/pages/profile/Profile.vue")
                },
                // --product_type--
                {
                    path: "/product_type",
                    name: "productTypeTable",
                    component: () =>
                        import ("@/view/pages/product_type/Table.vue"),
                    beforeEnter: (to, from, next) => {
                        if (
                            store.state.auth.userType === 1
                        ) {
                            next();
                        } else {
                            next("/");
                        }
                    }
                },
                {
                    path: "/product_type/form",
                    name: "productTypeFormCreate",
                    component: () =>
                        import ("@/view/pages/product_type/form/FormCreate.vue"),
                    beforeEnter: (to, from, next) => {
                        if (store.state.auth.userType === 1) {
                            next();
                        } else {
                            next("/");
                        }
                    }
                },
                {
                    path: "/product_type/form/:id",
                    name: "productTypeFormUpdate",
                    component: () =>
                        import ("@/view/pages/product_type/form/FormUpdate.vue"),
                    beforeEnter: (to, from, next) => {
                        if (store.state.auth.userType === 1) {
                            next();
                        } else {
                            next("/");
                        }
                    }
                },
                // --poster--
                {
                    path: "/poster",
                    name: "posterTable",
                    component: () =>
                        import ("@/view/pages/poster/Table.vue"),
                    beforeEnter: (to, from, next) => {
                        if (
                            store.state.auth.userType === 1
                        ) {
                            next();
                        } else {
                            next("/");
                        }
                    }
                },
                {
                    path: "/poster/form",
                    name: "posterFormCreate",
                    component: () =>
                        import ("@/view/pages/poster/form/FormCreate.vue"),
                    beforeEnter: (to, from, next) => {
                        if (store.state.auth.userType === 1) {
                            next();
                        } else {
                            next("/");
                        }
                    }
                },
                {
                    path: "/poster/form/:id",
                    name: "posterFormUpdate",
                    component: () =>
                        import ("@/view/pages/poster/form/FormUpdate.vue"),
                    beforeEnter: (to, from, next) => {
                        if (store.state.auth.userType === 1) {
                            next();
                        } else {
                            next("/");
                        }
                    }
                },
                // --poster--
                {
                    path: "/blog",
                    name: "blogTable",
                    component: () =>
                        import ("@/view/pages/blog/Table.vue"),
                    beforeEnter: (to, from, next) => {
                        if (
                            store.state.auth.userType === 1
                        ) {
                            next();
                        } else {
                            next("/");
                        }
                    }
                },
                {
                    path: "/blog/form",
                    name: "blogFormCreate",
                    component: () =>
                        import ("@/view/pages/blog/form/FormCreate.vue"),
                    beforeEnter: (to, from, next) => {
                        if (store.state.auth.userType === 1) {
                            next();
                        } else {
                            next("/");
                        }
                    }
                },
                {
                    path: "/blog/form/:id",
                    name: "blogFormUpdate",
                    component: () =>
                        import ("@/view/pages/blog/form/FormUpdate.vue"),
                    beforeEnter: (to, from, next) => {
                        if (store.state.auth.userType === 1) {
                            next();
                        } else {
                            next("/");
                        }
                    }
                },
                // --product--
                {
                    path: "/product",
                    name: "productTable",
                    component: () =>
                        import ("@/view/pages/product/Table.vue"),
                    beforeEnter: (to, from, next) => {
                        if (
                            store.state.auth.userType === 1
                        ) {
                            next();
                        } else {
                            next("/");
                        }
                    }
                },
                {
                    path: "/product/form",
                    name: "productFormCreate",
                    component: () =>
                        import ("@/view/pages/product/form/FormCreate.vue"),
                    beforeEnter: (to, from, next) => {
                        if (store.state.auth.userType === 1) {
                            next();
                        } else {
                            next("/");
                        }
                    }
                },
                {
                    path: "/product/form/:id",
                    name: "productFormUpdate",
                    component: () =>
                        import ("@/view/pages/product/form/FormUpdate.vue"),
                    beforeEnter: (to, from, next) => {
                        if (store.state.auth.userType === 1) {
                            next();
                        } else {
                            next("/");
                        }
                    }
                },
                {
                    path: "/sell",
                    name: "sellTable",
                    component: () =>
                        import ("@/view/pages/sell/Table.vue"),
                    beforeEnter: (to, from, next) => {
                        if (
                            store.state.auth.userType === 1
                        ) {
                            next();
                        } else {
                            next("/");
                        }
                    }
                },
                {
                    path: "/sell/form",
                    name: "sellFormCreate",
                    component: () =>
                        import ("@/view/pages/sell/form/FormCreate.vue"),
                    beforeEnter: (to, from, next) => {
                        if (store.state.auth.userType === 1) {
                            next();
                        } else {
                            next("/");
                        }
                    }
                },
                {
                    path: "/sell/form/:id",
                    name: "sellFormUpdate",
                    component: () =>
                        import ("@/view/pages/sell/form/FormUpdate.vue"),
                    beforeEnter: (to, from, next) => {
                        if (store.state.auth.userType === 1) {
                            next();
                        } else {
                            next("/");
                        }
                    }
                },
                {
                    path: "/meeting",
                    name: "meetingTable",
                    component: () =>
                        import ("@/view/pages/meeting/Table.vue"),
                    beforeEnter: (to, from, next) => {
                        if (
                            store.state.auth.userType === 1
                        ) {
                            next();
                        } else {
                            next("/");
                        }
                    }
                },
                {
                    path: "/meeting/form",
                    name: "meetingFormCreate",
                    component: () =>
                        import ("@/view/pages/meeting/form/FormCreate.vue"),
                    beforeEnter: (to, from, next) => {
                        if (store.state.auth.userType === 1) {
                            next();
                        } else {
                            next("/");
                        }
                    }
                },
                {
                    path: "/meeting/form/:id",
                    name: "meetingFormUpdate",
                    component: () =>
                        import ("@/view/pages/meeting/form/FormUpdate.vue"),
                    beforeEnter: (to, from, next) => {
                        if (store.state.auth.userType === 1) {
                            next();
                        } else {
                            next("/");
                        }
                    }
                },
            ]
        },
        {
            path: "/custom-error",
            name: "error",
            component: () =>
                import ("@/view/pages/error/Error.vue"),
            children: [{
                    path: "error-1",
                    name: "error-1",
                    component: () =>
                        import ("@/view/pages/error/Error-1.vue")
                },
                {
                    path: "error-2",
                    name: "error-2",
                    component: () =>
                        import ("@/view/pages/error/Error-2.vue")
                },
                {
                    path: "error-3",
                    name: "error-3",
                    component: () =>
                        import ("@/view/pages/error/Error-3.vue")
                },
                {
                    path: "error-4",
                    name: "error-4",
                    component: () =>
                        import ("@/view/pages/error/Error-4.vue")
                },
                {
                    path: "error-5",
                    name: "error-5",
                    component: () =>
                        import ("@/view/pages/error/Error-5.vue")
                },
                {
                    path: "error-6",
                    name: "error-6",
                    component: () =>
                        import ("@/view/pages/error/Error-6.vue")
                }
            ]
        },
        {
            path: "/",
            component: () =>
                import ("@/view/pages/login/Login"),
            beforeEnter: (to, from, next) => {
                store.state.auth.isAuthenticated ?
                    next({
                        name: "dashboard"
                    }) :
                    next();
            },
            children: [{
                name: "login",
                path: "/login",
                component: () =>
                    import ("@/view/pages/login/Login")
            }]
        },
        {
            path: "*",
            redirect: "/404"
        },
        {
            // the 404 route, when none of the above matches
            path: "/404",
            name: "404",
            component: () =>
                import ("@/view/pages/error/Error-1.vue")
        }
    ]
});