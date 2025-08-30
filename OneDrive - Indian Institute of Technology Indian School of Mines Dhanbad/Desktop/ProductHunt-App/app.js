async function loadPosts() {
  const token = "H7LY_HSKfDlCenlzT6W5qPeVmOpi1MdemyJItIQ7Srk"; // <-- API token ikkada pettav

  const query = `
    {
      posts(order: VOTES, first: 5) {
        edges {
          node {
            id
            name
            description
            url
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.producthunt.com/v2/api/graphql", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    });

    const data = await response.json();
    const postsDiv = document.getElementById("posts");
    postsDiv.innerHTML = "";

    data.data.posts.edges.forEach(edge => {
      const post = edge.node;
      const div = document.createElement("div");
      div.className = "post";
      div.innerHTML = `
        <h2>${post.name}</h2>
        <p>${post.description}</p>
        <a href="${post.url}" target="_blank">View on Product Hunt</a>
      `;
      postsDiv.appendChild(div);
    });

  } catch (err) {
    document.getElementById("posts").innerText = "Error fetching posts 😢";
    console.error(err);
  }
}

loadPosts();
