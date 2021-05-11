export const addCookie = () => {
  const data = new Date();
  const days = 1;
  data.setTime(data.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `appFormAdmin; path=/; max-age=${data}`;
};

export const deleteCoockie = (name) => {
  document.cookie = "appFormAdmin; path=/; max-age=-1";
};

export const checkCookie = () => {
  if (document.cookie === "appFormAdmin") {
    const cookieObj = {
      cookie: "appFormAdmin",
    };
    return cookieObj;
  } else return;
};
