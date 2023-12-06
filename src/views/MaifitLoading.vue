<template>
    <div class="loading-container">
        <div class="loading-animation"></div>
        <!-- print the parameter nextView of format "nextView: {{ nextView }}"-->
        <!-- new line -->
        <div>nextView: {{ this.nextView }}</div>
        <button class="button" @click="goToHome">Home</button>
    </div>
</template>

<style>
.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.loading-animation {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid #ccc;
    border-top-color: #007bff;
    animation: spin 1s infinite linear;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>

<script>
export default {
    name: 'MaifitLoading',
    data() {
        return {
            nextView: ''
        }
    },
    methods: {
        goToHome() {
            this.$router.push({ path: '/' });
        }
    },
    mounted() {
        // Simulating API call delay
        // setTimeout(() => {
        //     // Navigate to the next view
        //     this.$router.push(this.nextView);
        // }, 10000); // Change the delay time as per your requirement
    },
    created() {
        this.nextView = this.$route.params.nextView;
    }
}
</script>

<style>
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
