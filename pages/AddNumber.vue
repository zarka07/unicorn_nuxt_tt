<template>
  <form @submit.prevent="handleSubmit">
    <label>New number: </label>
    <input class="input-number" type="text" v-model="newNumber.number" required />
    <button v-if="newNumber.number.length>2" @click.prevent="addNumber">Add Number</button>
  </form>
</template>
<script>
export default{
  data(){
    return{
      newNumber:{
        number: "",
        timeStamp: new Date()
      }
    }
  },
  methods:{
    async addNumber(){
      await this.$store.dispatch("ADD_NUMBER", this.newNumber)
        .then(()=>this.$router.push('/'))
        .then(this.newNumber.number = '',
        this.newNumber.timeStamp = new Date())
        .catch(err=> console.log(err))
    }
  }
}
</script>
<style scoped>
form {
  background: #2f4765;
  padding: 20px;
  border-radius: 10px;
  margin: 15px 20px;
}
label {
  display: block;
  color: #bbb;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 20px 0 10px 0;
}
.input-number {
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  padding: 10px;
  border: 0;
  border-bottom: 2px solid #ddd;
  width: 100%;
  box-sizing: border-box;
  background-color: #2f4765;
  color: #bbb;
}
textarea {
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  background-color: #2f4765;
  border: 2px solid #ddd;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  height: 100px;
  color: #bbb;
}
form button {
  display: block;
  margin: 20px auto 0;
  background: #35df90;
  color: #fff;
  padding: 10px;
  border: 0;
  border-radius: 7px;
  font-size: 16px;
}
</style>
