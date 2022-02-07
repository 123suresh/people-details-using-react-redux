export const search = (people, searchTerm) => {
  const result = people?.filter((people) => {
    if (searchTerm === "") {
      return people;
    } else if (people.fname.toLowerCase().includes(searchTerm.toLowerCase())) {
      return people;
    } else if (people.email.toLowerCase().includes(searchTerm.toLowerCase())) {
      return people;
    }
  });
  return result;
};
