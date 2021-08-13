const counter = () => {
  const items = [...document.getElementById('commentUl').children];
  return items.length;
};

export default counter;