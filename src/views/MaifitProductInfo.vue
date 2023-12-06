<template>
    <div>
        <div class="image-container">
            <img :src="image_path" alt="Product Image" />
        </div>
        <div class="info-container">
            <h2>{{ brand }} {{ name }}</h2>
        </div>
        <div class="button-container">
            <button @click="goToPrev" class="button">Prev</button>
            <button @click="goToNext" class="button">Next</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "MaifitProductInfo",
    data() {
        return {
            productId: "",
            image_path: "",
            brand: "",
            name: "",
            showPrevButton: true,
        };
    },
    methods: {
        goToPrev() {
            if (this.showPrevButton)
                this.$router.push("/");
        },
        goToNext() {
            this.$router.push({ path: "/maifit/result", params: { productId: this.productId } });
        },
        fetchData() {
            // product link of format below
            // e.g. https://www.musinsa.com/app/goods/3590467?loc=goods_rank
            // https://www.musinsa.com/app/goods/3555045?loc=goods_rank
            // https://www.musinsa.com/app/goods/2794019
            this.productId = this.$route.params.productId; // Get the "productId" parameter from the router
            console.log('productId: ', this.productId);
            this.$axios.get(`/api/goods/${this.productId}`)
                .then(response => {
                    this.showPrevButton = false;
                    console.log(response.data);
                    // this.image_path = response.data.image_path;
                    // this.brand = response.data.brand;
                    // this.name = response.data.name;
                })
                .catch(error => {
                    console.error(error);
                });
        }
    },
    created() {
        this.fetchData();
        console.log(this.$route.params)
    },
    beforeRouteLeave(to, from, next) {
        this.showPrevButton = false;
        next();
    }
}
</script>

<style scoped>
.image-container {
    width: 50%;
    float: left;
}

.info-container {
    width: 50%;
    float: left;
}

.button-container {
    text-align: right;
    bottom: 20px; /* Position from the bottom */
    right: 20px; /* Position from the right */    
    padding: 10px 20px;
}

.button {
    position: fixed; /* Fixed positioning */
    background-color: #007bff;
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
}
</style>
