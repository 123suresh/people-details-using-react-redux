import { getItem } from "./localStorage";

export const checkUniqueEmail = (data) => {
  const peopleList = getItem();
  return peopleList.findIndex(
    (el) => el.email.toLowerCase() === data.email.toLowerCase()
  );
};

export const checkUniquePhoneNum = (data) => {
  const peopleList = getItem();
  return peopleList.findIndex((el) => el.phone === data.phone);
};
