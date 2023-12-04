<template>
    <div>
      <h1 class="header">Which product do you plan to purchase?</h1>
      <input class="input-field" type="text" v-model="productLink" placeholder="Enter link here">
      <button class="click-button" @click="goToProductInfo"></button>
      <div>
        <button class="home-button">
          <router-link to="/">Home</router-link>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'HomePage',
    components: {
    },
    data() {
      return {
        productLink: '',
      }
    },
    methods: {
      goToProductInfo() {
        // this.$router.push({ name: 'ProductInfo', params: { link: this.productLink } });
      }
    }
  }
  </script>
  
  <style scoped>
 
  .header {
    margin-bottom: 10px;
  }
  
  .input-field {
    margin-right: 10px;
    margin-bottom: 10px;
    width: 512px;
  }
  
  .click-button::before {
    /* Add styles for the click button here */
    content: "✔ ";
  }
  
  .home-button {
    /* Add styles for the home button here */
  }
  </style>