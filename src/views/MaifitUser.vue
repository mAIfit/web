
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
      <div>
        <label for="male">남성</label>
        <input type="radio" id="male" value="M" v-model="gender" />
      </div>
      <div>
        <label for="female">여성</label>
        <input type="radio" id="female" value="F" v-model="gender" />
      </div>
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
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(file);
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
  justify-content: normal;
  max-height: 300px;
}

.title {
  font-size: 24px;
  text-align: center;
}

.image-upload {
  flex-direction: column;
  margin-top: 30px;
  text-align: center;
  max-height: 300px;
}

.preview {
  /* 크기를 일치시킴 */
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: auto;
  position: relative; /* 추가 */
  z-index: 1;
}

.preview img {
  max-width: 100%;
  max-height: 100%;
}

.input-fields {
  display: flex;
  flex-direction: column; /* 위아래로 정렬하기 위해 flex-direction: column; 추가 */
  align-items: center; /* 수직 정렬을 위해 align-items 추가 */
  margin-top : 400px;
  position: absolute;
}

.input-fields input {
  padding: 10px 20px;
  margin-right: 20px;
}

.next-button {
  padding: 10px 20px;
  font-size: 16px;
  margin-left: 450px;
  margin-top: 400px;
  position: absolute;
}
</style>