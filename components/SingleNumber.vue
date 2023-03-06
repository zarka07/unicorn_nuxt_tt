<template>
  <div class="number">
    <div class="actions">
      <h3 @click="showDetails = !showDetails">{{ number.number }}</h3>
      <div class="icons">
        <router-link
          :to="{
            name: 'EditNumber',
            params: { id: number.id },
            query: { number: number.number },
          }"
          ><span class="material-symbols-outlined">edit</span></router-link
        >
        <span @click="$emit('deleteNumber')" class="material-symbols-outlined delete">delete</span>
      </div>
    </div>
    <div v-if="showDetails" class="details">
      <p>Add date: {{ addDate }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["number"],
  emits: ["deleteNumber"],
  data() {
    return {
      showDetails: false,
    };
  },
  computed: {
    addDate() {
      const today = new Date(this.number.timeStamp);
      const date =
        today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + " " + time;
      return dateTime;
    },
  },
};
</script>

<style>
.number {
  margin: 20px auto;
  background: #2f4765;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 0px 5px 4px #42b983;
}
h3 {
  cursor: pointer;
}
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.material-symbols-outlined {
  font-size: 24px;
  margin-left: 10px;
  color: #bbb;
  cursor: pointer;
}
.material-symbols-outlined:hover {
  color: #777;
}
.delete:hover {
  color: #ea4f30;
}
.number.complete {
  box-shadow: 0 0px 5px 4px rgb(43, 206, 135);
}
.number.complete .tick {
  color: #35df90;
}
</style>
