let idCounter = 1;

export const nextId = () => {
  return idCounter++;
};

export const contacts = [
  {
    id: nextId(),
    firstName: "Иван",
    lastName: "Бакланов",
    photo: "9a132499b8825bacaa92d29cbbc2c67e.jpeg",
    small: "HG67gpugvFqJHelqIyBLKT81x00Dq2G2.jpg",
    email: "nymless.ib@gmail.com",
    github: "https://github.com/nymless",
    telegram: "https://t.me/ivanbaklanov",
    info: "",
  },
];
