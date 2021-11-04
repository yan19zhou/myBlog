<template>
  <div class="dept-select">
    <el-select
      class="add-input DeviceID dept-select"
      clearable
      v-model="DepartmentID"
      :placeholder="$t('i18nView.Placeholder.PleaseChooseDepartment')"
    >
      <el-option
        v-for="(item , index ) in departmentList"
        :key="index"
        :value="item.key"
        :label="item.value"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import { getDepartmentOptions } from "@/server/staff";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      DepartmentID: "",
      departmentList: []
    };
  },
  mounted() {
    this.getDepartmentOptions();
  },
  computed: {
    ...mapGetters(["organizationID"])
  },
  methods: {
    getDepartmentOptions() {
      // 获取部门列表
      getDepartmentOptions({ organizationId: this.organizationID }).then(
        res => {
          this.departmentList = res;
        }
      );
    }
  },
  watch: {
    DepartmentID(newValue, oldValue) {
      this.$emit("valChange", newValue);
    }
  }
};
</script>

<style  scoped>
/* .dept-select .dept-select {
  width: 180px;
} */
</style>