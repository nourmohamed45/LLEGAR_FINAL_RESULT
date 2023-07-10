export const baseURL = "https://llegar-project-x0wv.onrender.com/api/v1";

const client = axios.create({
  baseURL,
});

export const request = ({ ...options }) => {
  client.defaults.headers.common.Accept = "application/json";
  client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    "JWT"
  )}`;

  const onSuccess = (response) => {
    console.log("<<Success>>", response.data);
    if (options.navigate) {
      window.location.pathname = options.navigate;
    }
    return response.data;
  };
  const onError = (err) => {
    console.log("<<ERROR>>", err);
    alert("something went wrong");

    return err.response;
  };

  return client(options).then(onSuccess).catch(onError);
};
