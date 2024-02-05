const people = [];
const functionSubmit = (event) => {
  event.preventDefault();
  const names = document.getElementById("input-name").value;
  const age = document.getElementById("input-age").value;
  const pocketMoney = document.getElementById("input-pocket").value;
  let person = {
    names: names,
    age: age,
    pocketMoney: pocketMoney,
  };
  people.push(person);
  console.log(people);
  const textResume = resumePeople()
  const resumeTag = document.getElementById("content-resume")
  resumeTag.innerHTML = textResume
  readPeople()
  clearInput();
};

const clearInput = () => {
  document.getElementById("input-name").value = "";
  document.getElementById("input-age").value = "";
  document.getElementById("input-pocket").value = "";
};

const readPeople = () => {
  const data = document.createElement("tr");
  for (let index = 0; index < people.length; index++) {
    data.innerHTML = `
    <th scope="row">${index + 1}</th>
    <td>${people[index].names}</td>
    <td>${people[index].age}</td>
    <td>${people[index].pocketMoney}</td>
    `;
    document.getElementById("table-budy").appendChild(data)
  }
  
};
const resumePeople = () => {
    
    let averageOfAge = 0
    let averageOfMoney = 0
    for (let index = 0; index < people.length; index++) {
        averageOfAge += parseInt(people[index].age) 
        averageOfMoney += parseInt(people[index].pocketMoney)
    }
    averageOfAge = averageOfAge / people.length
    averageOfMoney = averageOfMoney / people.length

    return `Rata rata pendaftar memiliki uang sangu sebesar ${averageOfMoney} dengan rata rata umur ${averageOfAge}`
}