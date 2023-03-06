<template>
  <form @submit.prevent="handleUpdate">
    <label>Edit number: </label>
    <input type="text" :placeholder="[[$route.query.number]]" v-model="newNumber" required />
    <button v-if="newNumber.length>2" @click.prevent="updateNumber">Update Number</button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      newNumber: "",
    };
  },
  methods: {
    async updateNumber() {
      let updateInfo = {
        id: this.$route.params.id,
        number: this.newNumber,
      }
      await this.$store.dispatch("UPDATE_NUMBER", updateInfo)
          .then(() => this.$router.push("/"))
          .catch((err) => console.log(err));
    },
  },
};
</script>
<style>
form {
  background: #2f4765;
  padding: 20px;
  border-radius: 10px;
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
input {
  padding: 10px;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  background-color: #2f4765;
  color: #bbb;
  border: 0;
  border-bottom: 2px solid #ddd;
  width: 100%;
  box-sizing: border-box;
}
textarea {
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  border-style: none;
  background-color: #2f4765;
  border-bottom: 2px solid #ddd;
  color: #bbb;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  height: 100px;
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
