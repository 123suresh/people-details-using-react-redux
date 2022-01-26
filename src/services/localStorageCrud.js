import { getItem, setItem } from "../components/utils/localStorage";

export const addDetail = (data) => {
  const peopleList = getItem();
  if (peopleList) {
    const detail = [...peopleList, data];
    setItem(detail);
  } else {
    const detail = [];
    setItem(detail);
  }
};

export const deleteDetail = (index) => {
  const peopleList = getItem();
  peopleList.splice(index, 1);
  const detail = [...peopleList];
  setItem(detail);
};
