export const getRepoParam = () => {
  var params = new URLSearchParams(window.location.search);
  var repo = params.get("repo");
  return repo || "";
};

export const setRepoParam = (repo) => () => {
  var url = new URL(window.location);
  if (repo === "") {
    url.searchParams.delete("repo");
  } else {
    url.searchParams.set("repo", repo);
  }
  history.replaceState(null, "", url);
};
