<template>
    <div class="loading-container">
        <div class="loading-animation"></div>
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
}
</script>
