<template>
    <div class="container">
        <MaifitLoading v-if="loadComplete == false" />

        <div class="image-label-container" v-if="displayedReview">
            <div class="displayed-image">
                <img
                    :src="displayedReview.image"
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
                <div @click="closeModal">
                    comment <br/>
                    {{ displayedReview.content }}
                </div>
            </div>
        </div>

        <div class="image-list" v-if="loadComplete">
            <div class="scroll-container">
                <div class="scroll-content">
                    <div v-for="review in reviews" :key="review.id" class="image-item">
                        <img
                            :src="review.image"
                            alt="Image"
                            class="image"
                            @click="displayReview(review.id)"
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
            reviews: null,
            displayedReview: null,
            loadComplete: false,

            showModal: false,
            meshComplete: false,
            userMeshImage: "",
            reviewerMeshImage: "",

            userId: 0,
        };
    },
    methods: {
        displayReview(id) {
            this.displayedReview = this.reviews.find(review => review.id === id);
            console.log("displayedReview: ", this.displayedReview);
        },

        goToHome() {
            this.$router.push({ path: '/' });
        },

        displayBodyShapeCompatibility() {
            console.log("displayBodyShapeCompatibility");
            this.$router.push({ path: `/maifit/compare/${this.userId}/${this.displayedReview.id}` });
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
        this.userId = this.$route.params.userId;
        console.log('productId: ', this.productId);
        console.log('userId: ', this.userId);
        try {
            // /goods/2794019/reviews?user_id=48
            this.$axios.get(`/api/goods/${this.productId}/reviews?user_id=${this.userId}`)
                .then(response => {
                    console.log('fetch reviews success');
                    this.reviews = response.data;
                    this.loadComplete = true;
                })
        } catch (error) {
            alert("Error: ", error)
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

.user-mesh-container {
    width: 50%;
}

.user-mesh-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.reviewer-mesh-container {
    width: 50%;
}

.reviewer-mesh-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
