
<template>
  <div class="container">
    <h1 class="title">체형예측에 사용할 본인의 사진을 올려주세요. (jpg only)</h1>
      <div class="image-upload">
        <input type="file" accept="image/jpeg" @change="handleImageUpload" />
        <div v-if="selectedImage" class="preview">
          <img :src="selectedImage" alt="Selected Image" />
        </div>
      </div>
    <div class="input-fields">
      <input type="string" v-model="gender" placeholder="성별(M,F)" />
      <input type="number" v-model="height" placeholder="키(cm)" />
    </div>
    <button class="next-button" @click="uploadImage">다음</button>
  </div>
</template>

<script>
import axios from 'axios';
const formData = new FormData();
export default {
  data() {
    return {
      selectedImage: null,
      gender: null,
      height: null
    };
    
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      //console.log(file);
      //const reader = new FileReader();
      //reader.onload = () => {
      //  this.selectedImage = reader.result;
      //};
      //reader.readAsDataURL(file);
      formData.append('image', file);
    },
    uploadImage() {
      //const formData = new FormData();
      formData.append('gender', this.gender);
      formData.append('height', this.height);

      //I want to post the formData to 'http://kevinshin.iptime.org/clients'
      axios({
        method: 'post',
        url: '/api/clients',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        //console.log(response.data);
        //get the user id from the response
        const user_Val = response.data.is_valid;
        //console.log(user_Val);
        if (user_Val == true) {
          console.log('user is valid')
          console.log(response.data);
          const userId = response.data.id;
          this.$router.push({ path: `/maifit/product_link/${userId}` });
        }
        else{
          alert("사진을 다시 올려주세요.");
        }}
      )
      .catch(error => {
        console.error(error);
      });
    }
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 24px;
  text-align: center;
}

.image-upload {
  flex-direction: column;
  margin-top: 30px;
  margin-bottom: 200px;
  text-align: center;
}

.preview {
  /* 크기를 일치시킴 */
  width: 50%;
  height: 50%;
  overflow: hidden;
  margin: auto;
  position: relative; /* 추가 */
  z-index: 1;
}

.preview img {
  max-width: 100%;
  max-height: 100%;
  margin-top: 50px;
}

.input-fields {
  display: flex;
  flex-direction: column; /* 위아래로 정렬하기 위해 flex-direction: column; 추가 */
  align-items: center; /* 수직 정렬을 위해 align-items 추가 */
  margin-top : 100px;
  position: absolute;
}

.input-fields input {
  padding: 10px 20px;
  margin-right: 20px;
}

.next-button {
  padding: 10px 20px;
  font-size: 16px;
  margin-left: 700px;
  margin-top: 150px;
  position: absolute;
}
</style>