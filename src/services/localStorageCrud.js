import {
  checkUniqueEmail,
  checkUniquePhoneNum,
} from "../components/utils/emailPhoneValidate";
import { getItem, setItem } from "../components/utils/localStorage";
import { v4 as uuidv4 } from "uuid";

export const emailPhoneValidation = (data) => {
  const emailValidation = checkUniqueEmail(data);
  const phoneValidation = checkUniquePhoneNum(data);
  if (emailValidation === -1 && phoneValidation === -1) {
    return true;
  } else {
    return false;
  }
};

export const addPeople = (data) => {
  const peopleList = getItem();
  const id = uuidv4();
  data.id = id;
  peopleList.push(data);
  setItem(peopleList);
  return data;
};

export const delPeople = (id) => {
  const peopleList = getItem();
  const index = peopleList.findIndex((el) => el.id === id);
  peopleList.splice(index, 1);
  setItem(peopleList);
  return id;
};

export const updatePeopleData = (data, id) => {
  const peopleList = getItem();
  const index = peopleList.findIndex((el) => el.id === id);
  data.id = id;
  peopleList[index] = data;
  setItem(peopleList);
  const updateData = { data, id };
  return updateData;
};
