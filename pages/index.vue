<template>
  <div class="home">
    <FilterNav :numbers="numbers"></FilterNav>
    <AddNumber />
    <div v-if="numbers.length">
      <div v-for="number in numbers" :key="number.id">
        <SingleNumber
          :number="number"
          @delete-number="deleteNumber(number.id)"
        >{{number.id}}></SingleNumber>
      </div>
    </div>
    <div class="page-number" v-else>No numbers</div>
    <div class="_pagination">
      <button
        :disabled="page===1"
        v-if="page != 1"
        class="pagination pagination-prev"
        @click.prevent="prevPage"
      >
        &lt; Prev
      </button>
      <p class="page-number">
        <b>{{ page }}</b>
      </p>
      <button
        v-if="isNextPage"
        class="pagination pagination-next"
        @click.prevent="nextPage"
      >
        Next >
      </button>
    </div>
  </div>
</template>

<script>
import SingleNumber from "../components/SingleNumber.vue";
import FilterNav from "@/components/FilterNav.vue";
import AddNumber from "@/pages/AddNumber.vue";
export default {
  name: 'IndexPage',
  components: {
    SingleNumber,
    FilterNav,
    AddNumber,
  },
  mounted(){
    this.$fetch()
  },
  async fetch(){
    await this.$store.dispatch("SET_NUMBERS", {
      page: this.page,
      limit: this.perPage,
      sort: this.sorting,
    })
  },
  data() {
    return {
      sorting: "desc",
    };
  },
  methods: {
    deleteNumber(id) {
      console.log('emit delete')
      this.$store.dispatch("DELETE_NUMBER", id);
    },
    prevPage() {
      this.$store.dispatch("PAGE_DOWN");
      this.$store.dispatch("SET_NUMBERS", {
        page: this.page,
        limit: this.perPage,
        sort: this.sorting,
      });
    },
    nextPage() {
      this.$store.dispatch("PAGE_UP");
      this.$store.dispatch("SET_NUMBERS", {
        page: this.page,
        limit: this.perPage,
        sort: this.sorting,
      });
    },
  },
  computed: {
    page() {
      return this.$store.getters.GET_PAGE;
    },
    numbers() {
      return this.$store.getters.GET_NUMBERS;
    },
    perPage() {
      return this.$store.getters.GET_PER_PAGE;
    },
    isNextPage() {
      if (this.page < this.numbers.length && this.numbers.length <= this.perPage) {
        return 1;
      } else return 0;
    },
  },
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&family=Open+Sans:ital,wght@0,300;1,600&family=Poppins:wght@200;400&display=swap');
body{
  margin:0;
}

#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 600px;
  margin: 0 auto;
  color: #bbb;
}
._pagination {
  display: flex;
  align-items: center;
  justify-content: center;
}
button.pagination {
  margin: 10px;
}
.page-number{
  color:#FFF;
}
</style>
