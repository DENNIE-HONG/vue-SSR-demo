/**
 * 自动require基础组件，文件夹名以Base开头的
 * @author luyanhong 2018-09-05
*/
import Vue from 'vue';
/**
 * 首字母大写
 * @param str 字符串
 * @example heheHaha
 * @return {string} HeheHaha
 */
const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1)

/**
 * 对符合'Basexxx/xx.vue'组件格式的组件取组件名
 * @param str fileName
 * @example abc/bcd/BaseXxx/basicTable.vue
 * @return {string} BasicTable
 */
const validateFileName = (str) => /^\.\/Base\S+\.vue$/.test(str) &&
    str.replace(/^\S+\/(\w+)\.vue$/, (rs, $1) => capitalizeFirstLetter($1))

const requireComponent = require.context('coms/', true, /\.vue$/);
// 找到组件文件夹下以.vue命名的文件，如果文件名为index，那么取组件中的name作为注册的组件名
requireComponent.keys().forEach((filePath) => {
  const componentConfig = requireComponent(filePath);
  const fileName = validateFileName(filePath);
  if (fileName) {
    const componentName = fileName.toLowerCase() === 'index'
      ? capitalizeFirstLetter(componentConfig.default.name)
      : fileName;
    Vue.component(componentName, componentConfig.default || componentConfig)
  }
});
