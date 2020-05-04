<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      категорий пока нет.
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>

    <form class="form" v-else @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" v-model="current">
          <option
            v-for="category of categories"
            :key="category.id"
            :value="category.id"
          >{{category.title}}</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" v-model="type" />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" v-model="type" />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: ($v.amount.$dirty && !$v.amount.required) || ($v.amount.$dirty && !$v.amount.minValue)}"
        />
        <label for="amount">Сумма</label>
        <span
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.required"
        >Поле обязательное для заполнения</span>
        <span
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.minValue"
        >Минимальное значение : {{ $v.amount.$params.minValue.min }}</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid: ($v.description.$dirty && !$v.description.required )}"
        />
        <label for="description">Описание</label>
        <span
          class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.required"
        >Поле обязательно для заполнения</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import Loader from "@/components/app/Loader";
import { minValue, required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
export default {
  name: "record",
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0,
    select: 0,
    current: null,
    //начальное значение для радио чекбокса
    type: "outcome",
    amount: 1,
    description: ""
  }),
  validations: {
    description: { required },
    amount: { required, minValue: minValue(1) }
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
    if (this.categories.length) {
      this.current = this.categories[0].id;
    }
    //хак постановки процесаа инициализации селектора в очередь, чтобы вью успел перемаунтить представление
    setTimeout(() => {
      this.select = window.M.FormSelect.init(this.$refs.select);
      window.M.updateTextFields();
    });
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  computed: {
    ...mapGetters(["info"]),
    canCreateRecord() {
      if (this.type === "income") {
        return true;
      }
      return this.info.bill >= this.amount;
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        categoryId: this.current,
        type: this.type,
        amount: this.amount,
        description: this.description,
        date: new Date().toJSON()
      };

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch("createRecord", formData);
          const bill =
            this.type === "income"
              ? this.info.bill + this.amount
              : this.info.bill - this.amount;

          await this.$store.dispatch("updateInfo", { bill });
          this.$message("Запись успешно создана");
          this.$v.$reset();
          this.amount = 1;
          this.description = "";
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$message(
          `Недостаточно средств на счете (${this.amount - this.info.bill})`
        );
      }
    }
  },
  components: {
    Loader
  }
};
</script>