<template>
  <ul class="pagination pagination-sm m-0 float-right" v-if="pageNumbers.length > 0">
    <template v-for="page in pageNumbers">
      <li class="page-item" :class="{ active: currentPage === page }" v-if="page !== '...'">
        <a class="page-link" @click.prevent="actionClick(page)">{{ page }}</a>
      </li>
      <li class="page-item" v-else>
        <span class="page-link">{{ page }}</span>
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  name: "Paginator",
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    lastPage: {
      type: Number,
      default: 1
    },
    numberOfShowPages: {
      type: Number,
      default: 5
    }
  },
  methods: {
    actionClick(page) {
      this.$emit("on-page-change", {
        current_page: this.currentPage,
        clicked_page: page
      });
    }
  },
  computed: {
    pageNumbers() {
      let pages = [];

      let quantityShowPages = this.numberOfShowPages;

      if (this.lastPage !== 1) {
        //если количество ссылок которые нужно показывать большче чем всего страниц
        if (quantityShowPages > this.lastPage) {
          quantityShowPages = this.lastPage;
        }

        //если текущая страница меньше чем половина ссылок которые нужно показывать
        if (this.currentPage <= quantityShowPages / 2) {
          for (let i = 1; i <= quantityShowPages; i++) {
            pages.push(i);
          }
          if (quantityShowPages !== this.lastPage && this.currentPage !== this.lastPage) {
            pages.push("...");
            pages.push(this.lastPage);
          }
        } // если текущая страница находится на расстоянии половины ссылок которые нужно показать от конца списка
        else if (this.currentPage + quantityShowPages / 2 >= this.lastPage) {
          for (let j = this.lastPage; j > this.lastPage - quantityShowPages; j--) {
            pages.unshift(j);
          }

          if (this.currentPage > quantityShowPages && quantityShowPages !== this.lastPage) {
            pages.unshift("....");
            pages.unshift(1);
          }
        } else {
          pages.push(1);
          pages.push("...");

          const left = parseInt(Math.round(quantityShowPages / 2) - 1);

          for (let k = this.currentPage - left; k < this.currentPage; k++) {
            if (k !== 1) pages.push(k);
          }

          for (let m = this.currentPage; m < this.currentPage + left; m++) {
            if (m < this.lastPage) pages.push(m);
          }

          if (quantityShowPages !== this.lastPage && this.currentPage !== this.lastPage) {
            pages.push("...");
            pages.push(this.lastPage);
          }
        }
      }

      return pages;
    }
  }
};
</script>

<style scoped></style>
