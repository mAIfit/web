<template>
    <div>
        <div class="content-container">
            <div class="image-container">
                <img :src="image_path" alt="Product Image" />
            </div>
            <div class="info-container">
                <h2>[{{ brand }}] {{ name }}</h2>
            </div>
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
            this.$router.push({ path: `/maifit/result/${this.productId}` });
        },
        fetchData() {
            // product link of format below
            // e.g. https://www.musinsa.com/app/goods/3590467?loc=goods_rank
            // https://www.musinsa.com/app/goods/3555045?loc=goods_rank
            // https://www.musinsa.com/app/goods/2794019
            this.productId = this.$route.params.productId; // Get the "productId" parameter from the router
            console.log('productId: ', this.productId);
            this.$axios.get(`http://kevinshin.iptime.org/goods/${this.productId}`)
                .then(response => {
                    this.showPrevButton = false;
                    console.log(response.data);
                    this.image_path = response.data.image;
                    this.brand = response.data.brand;
                    this.name = response.data.name;
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
.content-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
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
    bottom: 0; /* Position from the bottom */
    right: 0; /* Position from the right */    
    padding: 10px 20px;
}

.button {
    background-color: #007bff;
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
}
</style>
