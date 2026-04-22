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

export const getViewParam = () => {
  var params = new URLSearchParams(window.location.search);
  var view = params.get("view");
  return view || "";
};

export const setViewParam = (view) => () => {
  var url = new URL(window.location);
  if (view === "") {
    url.searchParams.delete("view");
  } else {
    url.searchParams.set("view", view);
  }
  history.replaceState(null, "", url);
};

export const getBranchParam = () => {
  var params = new URLSearchParams(window.location.search);
  var branch = params.get("branch");
  return branch || "";
};

export const setBranchParam = (branch) => () => {
  var url = new URL(window.location);
  if (branch === "") {
    url.searchParams.delete("branch");
  } else {
    url.searchParams.set("branch", branch);
  }
  history.replaceState(null, "", url);
};
