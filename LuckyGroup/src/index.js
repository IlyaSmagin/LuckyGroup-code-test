// window.location.search = ?count=5
import "./reset.css";
import "./style.css";
const URL_params = new URLSearchParams(window.location.search);
const feed = document.getElementsByClassName("mainContent")[0];

let postCount = 4;
let fetchedPosts;
let appendedCounter = 0;

if (URL_params.has("count")) {
  postCount = Number(URL_params.get("count"));
}

async function fetchPosts() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/photos/?_page=1&_limit=19"
  );
  const posts = await response.json();
  return posts;
}
fetchPosts().then((data) => {
  fetchedPosts = data;
  //feed && ensures that fetch hapends after we have mounting point;
  appendedCounter =
    feed && appendPost(fetchedPosts, postCount, appendedCounter);
});

function appendPost(posts, postCount, postAppended) {
  const paginationEnd = postAppended + postCount;
  for (let i = postAppended; i < posts.length && i < paginationEnd; i++) {
    let postInfo = posts[i];

    const post = document.createElement("article");
    const title = document.createElement("h6");
    const img = document.createElement("img");

    post.classList = "post";
    img.src = postInfo.url;
    img.alt = "post image";
    img.classList = "post__img";
    title.innerText = postInfo.title;
    title.classList = "post__title";
    
    post.appendChild(img);
    post.appendChild(title);
    feed.appendChild(post);
  }
  return paginationEnd;
}

window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 10
  ) {
    appendedCounter = appendPost(fetchedPosts, postCount, appendedCounter);
  }
});
if (!feed)
  throw new Error("Could not find mainContent aka feed to append posts to");
