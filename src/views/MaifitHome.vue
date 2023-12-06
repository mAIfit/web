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
      // use product_id in apiCall
      const productId = this.getProductId();
      console.log(productId);
      if (isNaN(productId)) {
        alert('Please enter a valid product link');
        this.clearCurrentPage();
        return;
      }
      const apiCall = this.$axios.get(`/goods/${this.getProductId()}`); // replace with your actual API call
      const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), 3000));

      Promise.race([apiCall, timeout])
        .then(response => {
          // handle successful API response here
          // response.data has 3 attributes
          // - image_path
          // - brand
          // - name
          // navigate to product_info page with parameters image_path, brand, name

          this.$router.push({
            path: '/maifit/product_info',
            params: {
              image_path: response.data.image_path,
              brand: response.data.brand,
              name: response.data.name,
            }
          });
        })
        .catch(error => {
          if (error.message === 'Request timed out') {
            alert('API call did not return for 3 seconds');
          }
          else if (error.response.status === 404) {
            alert('Not Found');
          }
          else {
            alert('An error occurred');
          }
          this.clearCurrentPage();
        });
    },

    clearCurrentPage() {
      this.productLink = '';
    },
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