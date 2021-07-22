
export default function setScore(level) {
    let data = JSON.parse(localStorage.getItem("dataPlayer"));
    let nameSortLevel = `${level}Score`;
    let arr = [];
    for (var keys in data) {
        arr.push(data[keys]);
    }
     arr.sort((a, b) => a[nameSortLevel] < b[nameSortLevel] ? 1 : -1);
     arr.length=10;
    return arr;
  }