<template>
</template>
<script>
/**
 * 表格列项
 * @param {String}  表格头文案
 * @param {String}  当前列显示数据的哪个属相
 * @author luyanhong 2018-09-19
 * @example
 * <base-table-column label="序号" prop="id"></base-table-column>
*/
export default {
  name: 'BaseTableColumn',
  props: {
    label: {
      type: String
    },
    prop: {
      type: String
    }
  }
}
</script>

