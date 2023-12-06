<template>
    <div>
        <div class="image-container">
            <img :src="image_path" alt="Product Image" />
        </div>
        <div class="info-container">
            <h2>{{ brand }} {{ name }}</h2>
        </div>
        <div class="button-container">
            <button @click="goToPrev">Prev</button>
            <button @click="goToNext">Next</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "MaifitProductInfo",
    data() {
        return {
            image_path: "",
            brand: "",
            name: ""
        };
    },
    methods: {
        goToPrev() {
            this.$router.push("/");
        },
        goToNext() {
            this.$router.push("/maifit/user");
        }
    },
    created() {
        this.image_path = this.$route.params.image_path;
        this.brand = this.$route.params.brand;
        this.name = this.$route.params.name;
    }
};
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
    margin-top: 20px;
}
</style>
