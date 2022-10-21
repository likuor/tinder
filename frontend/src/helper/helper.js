//Home to pick a user randomly
const pickRandomUser = (usersArray) => {
  const randomNumber = Math.floor(Math.random() * usersArray.length);
  return usersArray[randomNumber];
};

export { pickRandomUser };
