<template>
    <div class="container">
        <MaifitLoading v-if="loadComplete == false" />

        <div class="image-label-container" v-if="displayedReview">
            <div class="displayed-image">
                <img
                    :src="require(`@/assets/test/${displayedReview.image}`)"
                    alt="Displayed Image"
                    class="displayed-image"
                />
            </div>

            <div class="labels-container">
                <div class="label-row">
                    <div class="label-item" 
                        @click="displayBodyShapeCompatibility()" 
                        style="text-decoration: underline;
                               cursor: pointer">
                        Body shape compatibility
                    </div>
                </div>
                <div class="label-row">
                    <div class="label-item">
                        Heights:
                    </div>
                    <div class="label-item">
                        {{ displayedReview.height }}
                    </div>
                </div>
                <div class="label-row">
                    <div class="label-item">
                        Weights:
                    </div>
                    <div class="label-item">
                        {{ displayedReview.weight }}
                    </div>
                </div>
                <div class="label-row">
                    <div class="label-item">
                        Size:
                    </div>
                    <div class="label-item">
                        {{ displayedReview.product_size }}
                    </div>
                </div>
                <div>
                    content <br/>
                    {{ displayedReview.content }}
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
                            @click="displayReview(review.id)"
                        />
                    </div>
                </div>
            </div>
        </div>

        
        <!-- Modal -->
        <div class="modal" v-if="this.showModal" @click="closeModal">
            <div class="modal-content" @click.stop>
                <button>prev</button>
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
                { id: 1, image: "blood.jpg" , height: 170, weight: 60, product_size: "M", content: "C1" },
                { id: 2, image: "butterfly.jpg" , height: 170, weight: 65, product_size: "L", content: "C2" },
                { id: 3, image: "color.jpg" , height: 170, weight: 64, product_size: "XL", content: "C3" },
                { id: 4, image: "quality.webp" , height: 170, weight: 63, product_size: "S", content: "C4" },
                { id: 5, image: "valentines.png" , height: 170, weight: 62, product_size: "M", content: "C5" },
                { id: 6, image: "yoga.webp" , height: 170, weight: 61, product_size: "L", content: "C6" },
            ],
            displayedReview: null,
            loadComplete: false,

            showModal: false,
            meshComplete: false,
            userMeshImage: "",
            reviewerMeshImage: "",
        };
    },
    methods: {
        displayReview(id) {
            this.displayedReview = this.reviews.find(review => review.id === id);
        },

        goToHome() {
            this.$router.push({ path: '/' });
        },

        displayBodyShapeCompatibility() {
            console.log("displayBodyShapeCompatibility");
            // API call to get human mesh from user and reviewer
            // display in popup

            this.meshComplete = false;
            // 1. API call
            this.userMeshImage = '@/assets/test/'+this.reviews[0].image;
            this.reviewerMeshImage = '@/assets/test/'+this.displayedReview.image;
            console.log("userMeshImage: ", this.userMeshImage);
            console.log("reviewerMeshImage: ", this.reviewerMeshImage);
            
            // 2. Display in popup
            this.openModal()
            this.showModal = true;
            this.meshComplete = true; // TODO: inside API call
            console.log("showModal: ", this.showModal)
        },

        openModal() {
            this.showModal = true;
        },

        closeModal() {
            this.showModal = false;
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
                        console.error(error);

                        setTimeout(() => {
                                this.loadComplete = true;
                            }, 3000);
                    } else {
                        setTimeout(() => {
                                this.loadComplete = true;
                            }, 3000);
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

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    padding: 20px;
    display: flex;
    justify-content: space-between;
}
</style>
