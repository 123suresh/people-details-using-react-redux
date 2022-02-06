export const sortPeopleAsc = (people, col) => {
  const sorted = people.sort((a, b) =>
    a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
  );
  return sorted;
};

export const sortPeopleDesc = (people, col) => {
  const sorted = people.sort((a, b) =>
    a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
  );
  return sorted;
};
