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
  name: 'MaifitProductLink',
  props: ['userData'],
  components: {
  },
  data() {
    return {
      userId: 0,
      productLink: '',
    }
  },
  methods: {
    // fetch product id from product link
    getProductId() {
      // product link of format below
      // e.g. https://www.musinsa.com/app/goods/3590467?loc=goods_rank
      // https://www.musinsa.com/app/goods/3555045?loc=goods_rank
      // https://www.musinsa.com/app/goods/2794019
      // product id is 3590467
      // You can modify this function to get the product id from the product link

      // if an error occurs, return a NaN
      try {
        const productId = this.productLink.split('/')[5].split('?')[0];
        return productId;
      } catch (error) {
        return NaN;
      }
    },

    async goToProductInfo() {
      const productId = this.getProductId();
      const userId = this.userId;
      console.log(productId);
      if (productId) {
        this.$router.push({ path: `/maifit/product_info/${productId}/${userId}` } );
      } else {
        alert('Invalid product link');
      }
    },

    clearCurrentPage() {
      this.productLink = '';
    },
  },

  created() {
    this.userId = this.$route.params.userId;
    console.log('userId: '+this.userId);
  },
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