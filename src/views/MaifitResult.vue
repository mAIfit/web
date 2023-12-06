<template>
    <div class="container">
        <MaifitLoading v-if="loadComplete == false" />

        <div class="image-label-container" v-if="displayedImageUrl">
            <div class="displayed-image">
                <img
                    :src="require(`@/assets/test/${displayedImageUrl}`)"
                    alt="Displayed Image"
                    class="displayed-image"
                />
            </div>

            <div class="labels-container">
                <div class="label-row">
                    <div class="label-item">
                        Body shape compatibility:
                    </div>
                    <div class="label-item">
                        {{ attribute1 }}
                    </div>
                </div>
                <div class="label-row">
                    <div class="label-item">
                        Heights:
                    </div>
                    <div class="label-item">
                        {{ attribute2 }}
                    </div>
                </div>
                <div class="label-row">
                    <div class="label-item">
                        Weights:
                    </div>
                    <div class="label-item">
                        {{ attribute3 }}
                    </div>
                </div>
                <div class="label-row">
                    <div class="label-item">
                        Size:
                    </div>
                    <div class="label-item">
                        {{ attribute4 }}
                    </div>
                </div>
                <div>
                    Comments <br/>
                    {{ comments }}
                </div>
            </div>
        </div>
        

        <div class="image-list" v-if="loadComplete">
            <div class="scroll-container">
                <div class="scroll-content">
                    <div v-for="review in reviews" :key="review.id" class="image-item">
                        <img
                            :src="require(`@/assets/test/${review.image}`)"
                            alt="Image"
                            class="image"
                            @click="displayImage(review.image)"
                        />
                    </div>
                </div>
            </div>
        </div>

        <button @click="goToHome" class="button">Home</button>
    </div>
</template>

<script>
import MaifitLoading from "@/views/MaifitLoading.vue";

export default {
    components: {
        MaifitLoading,
    },
    data() {
        return {
            productId: "",
            reviews: [
                { id: 1, image: "blood.jpg" , height: 170, weight: 60, product_size: "M", comments: "C1" },
                { id: 2, image: "butterfly.jpg" , height: 170, weight: 65, product_size: "L", comments: "C2" },
                { id: 3, image: "color.jpg" , height: 170, weight: 64, product_size: "XL", comments: "C3" },
                { id: 4, image: "quality.webp" , height: 170, weight: 63, product_size: "S", comments: "C4" },
                { id: 5, image: "valentines.png" , height: 170, weight: 62, product_size: "M", comments: "C5" },
                { id: 6, image: "yoga.webp" , height: 170, weight: 61, product_size: "L", comments: "C6" },
            ],
            displayedImageUrl: null,
            attribute1: "Value 1",
            attribute2: "Value 2",
            attribute3: "Value 3",
            attribute4: "Value 4",
            comments: "comments by reviewer",
            loadComplete: false,
        };
    },
    methods: {
        displayImage(url) {
            this.displayedImageUrl = url;
        },

        goToHome() {
            this.$router.push({ path: '/' });
        },
    },
    created() {
        this.productId = this.$route.params.productId; 
        try {
            this.$axios.get(`/api/goods/${this.productId}/reviews?user_id=1`)
                .then(response => {
                    console.log(response.data);
                    this.reviews = response.data;
                    this.loadComplete = true;
                })
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                        console.log("404 Error: Not Found");
                        setTimeout(() => {
                                this.loadComplete = true;
                            }, 3000);
                    } else {
                        console.error(error);
                    }
                });
        } catch (error) {
            console.error(error);
        }
    }
};
</script>

<style>
.container {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 100vh;
}

.image-label-container {
    display: flex;
    align-items: flex-start;
}

.displayed-image {
    margin-right: 20px; /* Added margin */
    margin-bottom: 20px;
}

.labels-container {
    display: flex;
    flex-direction: column;
}

.label-row {
    display: flex;
    margin-bottom: 20px;
}

.label-item {
    margin-right: 10px;
}

.image-list {
    width: 1000px;
    overflow-x: auto;
    white-space: nowrap;
}

.scroll-container {
    display: flex;
    flex-wrap: nowrap;
}

.scroll-content {
    display: flex;
}

.image-item {
    margin-right: 10px;
}

.image {
    width: 200px;
    height: 200px;
    object-fit: cover;
}

.displayed-image {
    display: flex;
    justify-content: center;
}

.displayed-image img {
    width: 400px;
    height: 400px;
    object-fit: cover;
}

.button {
    position: fixed; /* Fixed positioning */
    bottom: 20px; /* Position from the bottom */
    right: 20px; /* Position from the right */
    background-color: #007bff;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
}
</style>
