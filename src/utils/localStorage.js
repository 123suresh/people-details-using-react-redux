export const setItem = (people) =>
  localStorage.setItem("people", JSON.stringify(people));

export const getItem = () => {
  const initialData = [];
  const people = localStorage.getItem("people");
  if (people) {
    return JSON.parse(people);
  } else {
    setItem(initialData);
    return initialData;
  }
};
