<template>
  <nav class="filter-nav">
    <div class="sort">
      Sort by:
      <button
        @click="currentSorting = 'desc'"
        :class="{ active: currentSorting === 'asc' }"
      >
        Desc
      </button>
      <button
        @click="currentSorting = 'asc'"
        :class="{ active: currentSorting === 'desc' }"
      >
        Asc
      </button>
    </div>
    <div class="pagination">
      On page:
      <select
        class="selectBreed"
        aria-label="numbersCount"
        v-model="onPage"
        title="numbersCount"
        name="numbersCount"
        id="numbersCount"
      >
        <option v-for="item in numbersCount" :key="item" :value="item">
          {{ item }}
        </option>
      </select>
    </div>
    <div class="search">
      <input type="tel" v-model="searchParam" class="search-input" placeholder="" />
      <button
        class="button search-button"
        id="search"
        @click.prevent="checkParam(searchParam)"
      >
        Search
      </button>
      <button class="button reset-button" id="reset" @click.prevent="reset">Reset</button>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      onPage: this.$store.getters.GET_PER_PAGE,
      searchParam: "",
      currentSorting: "desc",
      numbersCount: [5, 10, 15],
    };
  },
  props: ["numbers"],
  methods: {
    checkParam(searchParam) {
      let sliced = searchParam;
      if (searchParam[0] === "+") {
        sliced = searchParam.slice(1).trim();
      }
      this.search(sliced);
    },
    async search(searchParam) {
      await this.$store.dispatch("SEARCH_NUMBER", searchParam);
    },
    async reset() {
      await this.$store
        .dispatch("SET_NUMBERS", {
          page: 1,
          limit: 5,
          sort: "desc",
        })
        .then((this.searchParam = ""));
    },
    sort(value) {
      this.sorting = value;
      switch (this.sorting) {
        case "desc":
          this.sort_desc();
          break;
        case "asc":
          this.sort_asc();
          break;
      }
    },
    sort_asc() {
      this.$store.dispatch("SORT_ASC", {
        page: this.currentPage,
        limit: this.onPage,
        sort: "asc",
      });
    },
    sort_desc() {
      this.$store.dispatch("SORT_DESC", {
        page: this.currentPage,
        limit: this.onPage,
        sort: "desc",
      });
    },
  },
  computed: {
    currentPage() {
      return this.$store.getters.GET_PAGE;
    },
  },
  watch: {
    onPage() {
      this.$store.dispatch("SET_PER_PAGE", this.onPage)
      this.$store.dispatch("SET_NUMBERS", {
        page: this.currentPage,
        limit: this.onPage,
        sort: "desc",
      });
    },
    currentSorting() {
      this.currentSorting === "desc" ? this.sort_asc() : this.sort_desc();
    },
  },
};
</script>
<style>
.filter-nav {
  display: flex;
  align-items: center;
}
.filter-nav button {
  background: none;
  border: none;
  color: #bbb;
  outline: none;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  cursor: pointer;
}
.filter-nav button.active {
  color: #555;
}
.sort,
.pagination,
.search {
  border: 1px solid #fff;
  padding: 2px;
  margin-right: 5px;
  box-shadow: 0 0px 3px 2px #42b983;
}
.search {
  margin-right: 0px;
  margin-left: auto;
  display: flex;
  align-content: flex-end;
  align-items: center;
}
.search-input {
  padding: 0 !important;
  background-color: #fff;
}
</style>
