export const setItem = (detail) =>
  localStorage.setItem("detail", JSON.stringify(detail));

export const getItem = () => {
  const initialData = [];
  const people = localStorage.getItem("detail");
  if (people) {
    return JSON.parse(people);
  } else {
    setItem(initialData);
    return initialData;
  }
};
