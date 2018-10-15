const required = () => {
  throw Error('missing parameter！');
}
const isEmpty = (object = required()) => {
  const arr = Object.keys(object);
  return (arr.length === 0);
}
export default isEmpty;
