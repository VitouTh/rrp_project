<template>
  <ul class="menu-nav">
    <router-link
      to="/dashboard"
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <i class="menu-icon flaticon2-digital-marketing"></i>
          <span class="menu-text">
            {{ $t("MENU.DASHBOARD.TITLE") }}
          </span>
        </a>
      </li>
    </router-link>

    <router-link
      to="/user"
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <li v-if="userType === 1"
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <!-- <i class="menu-icon far fa-user"></i> -->
          <span class="menu-text">{{ $t("MENU.USER_MANAGEMENT.TITLE") }}</span>
        </a>
      </li>
    </router-link>

    <router-link
      to="/customer"
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <li v-if="userType === 1"
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <!-- <i class="menu-icon far fa-user"></i> -->
          <span class="menu-text">{{ $t("MENU.CUSTOMER.TITLE") }}</span>
        </a>
      </li>
    </router-link>

    <router-link
      to="/product_type"
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <li v-if="userType === 1"
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <!-- <i class="menu-icon far fa-user"></i> -->
          <span class="menu-text">{{ $t("MENU.PRODUCT_TYPE.TITLE") }}</span>
        </a>
      </li>
    </router-link>

    <router-link
      to="/poster"
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <li v-if="userType === 1"
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <!-- <i class="menu-icon far fa-user"></i> -->
          <span class="menu-text">{{ $t("MENU.POSTER.TITLE") }}</span>
        </a>
      </li>
    </router-link>

    <router-link
      to="/blog"
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <li v-if="userType === 1"
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <!-- <i class="menu-icon far fa-user"></i> -->
          <span class="menu-text">{{ $t("MENU.BLOG.TITLE") }}</span>
        </a>
      </li>
    </router-link>
    <router-link
      to="/product"
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <li v-if="userType === 1"
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <!-- <i class="menu-icon far fa-user"></i> -->
          <span class="menu-text">{{ $t("MENU.PRODUCT.TITLE") }}</span>
        </a>
      </li>
    </router-link>
    <router-link
      to="/sell"
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <li v-if="userType === 1"
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <!-- <i class="menu-icon far fa-user"></i> -->
          <span class="menu-text">{{ $t("MENU.SELL.TITLE") }}</span>
        </a>
      </li>
    </router-link>
    <router-link
      to="/meeting"
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <li v-if="userType === 1"
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <!-- <i class="menu-icon far fa-user"></i> -->
          <span class="menu-text">{{ $t("MENU.MEETING.TITLE") }}</span>
        </a>
      </li>
    </router-link>
    <br>
    <br>
    <br>
    <a href="#">language: </a> 
    <br>
    <div class="column d-flex justify-content-around " style="height: 30px; width:100px;">
      <!-- <a href="#">language: </a> -->
      <a href="" @click="setLang('kh')" ><img class="flag" src="../../../../public/media/flag/kh.png" alt=""></a>
    <a href="" @click="setLang('en')" ><img class="flag" src="../../../../public/media/flag/en.png" alt=""></a>
    </div>
  
  </ul>
</template>

<style>
  .flag{
    width:20px;
    height: 20px;
  }
</style>

<script>
import { mapState } from "vuex";

export default {
  name: "KTMenu",
  computed: {
    ...mapState({
      userType: state => state.auth.userType
    })
  },
  methods: {
    hasActiveChildren(match) {
      return this.$route["path"].indexOf(match) !== -1;
    },
    setLang(language){
      return localStorage.setItem("language", language);
    }
  }
};
</script> 
