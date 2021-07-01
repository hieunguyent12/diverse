const fetcher = (...args) => {
  return fetch(...args).then((res) => res.json());
};

export default fetcher;
