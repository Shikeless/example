<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{info.bill | currency("RUB")}}</h4>
    </div>
    <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">
      категорий пока нет.
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>
    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{cat.title}}</strong>
          {{cat.spend | currency("RUB")}} из {{cat.limit | currency("RUB")}}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{width: cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Loader from "@/components/app/Loader";
import currencyFilter from "@/filters/currency.filter";
import { mapGetters } from "vuex";
export default {
  name: "planning",
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(["info"])
  },
  async mounted() {
    const records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
    this.categories = categories.map(cat => {
      const spend = records
        .filter(record => record.categoryId == cat.id)
        .filter(r => r.type === "outcome")
        .reduce((total, records) => {
          return (total = +records.amount);
        }, 0);

      const percent = (100 * spend) / cat.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      const progressColor =
        percent < 60 ? "green" : percent < 100 ? "yellow" : "red";
      const tooltipValue = cat.limit - spend;
      const tooltip = `${
        tooltipValue < 0 ? "Превышение на:" : "Осталось"
      } ${currencyFilter(Math.abs(tooltipValue))}`;
      return { ...cat, progressPercent, progressColor, spend, tooltip };
    });
  },
  compnents: {
    Loader
  }
};
</script>