import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth.module";
import htmlClass from "./htmlclass.module";
import config from "./config.module";
import breadcrumbs from "./breadcrumbs.module";
import user from "./user.module";
import userType from "./userType.module";
import productType from "./productType.module";
import poster from "./poster.module";
import blog from "./blog.module";
import product from "./product.module";
import sell from "./sell.module";
import meeting from "./meeting.module";
import profile from "./profile.module"


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        htmlClass,
        config,
        breadcrumbs,
        user,
        userType,
        productType,
        poster,
        blog,
        product,
        sell,
        meeting,
        profile,
    }
});