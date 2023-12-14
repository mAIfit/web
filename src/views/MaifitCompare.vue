<template>
<div>
    <div class="image-container">
        <img :src="this.userMeshImage" alt="user image" class="half-size">
        <img :src="this.reviewerMeshImage" alt="reviewer image" class="half-size">
    </div>
</div>
</template>

<script>
export default {
    name: 'MaifitCompare',
    data() {
        return {
            userId: 0,
            reviewId: 0,
            userMeshImage: '',
            reviewerMeshImage: '',
        }
    },

    created() {
        this.userId = this.$route.params.userId;
        this.reviewId = this.$route.params.reviewId;
        console.log("userId: ", this.userId);
        console.log("reviewId: ", this.reviewId);
        try {
            this.$axios.get(`/api/reviews/${this.reviewId}/body_shapes?user_id=${this.userId}`)
                .then(response => {
                    console.log('compare success');
                    console.log(response.data);
                    this.userMeshImage = response.data.user_overlayed_image;
                    this.reviewerMeshImage = response.data.review_overlayed_image;
                })
                .catch(error => {
                    console.error(error);
                    this.userMeshImage = require(`@/assets/test/blood.jpg`);
                    this.reviewerMeshImage = require(`@/assets/test/butterfly.jpg`);
                });
        } catch (error) {
            console.log("Error: ", error);
            this.userMeshImage = require(`@/assets/test/blood.jpg`);
            this.reviewerMeshImage = require(`@/assets/test/butterfly.jpg`);
        }
        console.log("userMeshImage: ", this.userMeshImage);
        console.log("reviewerMeshImage: ", this.reviewerMeshImage);
    },
}
</script>

<style>
/* Add any necessary styling for the images here */
.image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 50%;
    margin: 0 auto;
}

.half-size {
    width: 50%;
    height: 50%;
}
</style>
