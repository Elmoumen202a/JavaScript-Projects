// Features list
const features = [
    { emoji: "📜", description: "Post your thoughts or ideas." },
    { emoji: "❤️", description: "Like and Unlike posts." },
    { emoji: "✏️", description: "Edit your posts." },
    { emoji: "✨", description: "Clean and modern UI." }
  ];
  
  // Dynamically add features
  const featuresSection = document.getElementById('features');
  features.forEach(feature => {
    const featureItem = document.createElement('div');
    featureItem.className = 'feature-item';
    featureItem.innerHTML = `<span>${feature.emoji}</span> ${feature.description}`;
    featuresSection.appendChild(featureItem);
  });
  
  // Handle posts
  const postButton = document.getElementById('postButton');
  const postContent = document.getElementById('postContent');
  const feed = document.getElementById('feed');
  
  // Add a post to the feed
  function addPost(content) {
    const post = document.createElement('div');
    post.className = 'post';
  
    const postText = document.createElement('div');
    postText.className = 'post-content';
    postText.textContent = content;
  
    const buttonsDiv = document.createElement('div');
  
    const likeButton = document.createElement('button');
    likeButton.className = 'like-btn';
    likeButton.textContent = 'Like';
    likeButton.setAttribute('data-liked', 'false');
  
    const editButton = document.createElement('button');
    editButton.className = 'edit-btn';
    editButton.textContent = 'Edit';
  
    // Like/Unlike functionality
    likeButton.onclick = () => {
      const isLiked = likeButton.getAttribute('data-liked') === 'true';
      likeButton.setAttribute('data-liked', !isLiked);
      likeButton.textContent = isLiked ? 'Like' : 'Unlike';
    };
  
    // Edit functionality
    editButton.onclick = () => {
      const newContent = prompt('Edit your post:', postText.textContent);
      if (newContent) {
        postText.textContent = newContent;
      }
    };
  
    buttonsDiv.appendChild(likeButton);
    buttonsDiv.appendChild(editButton);
    post.appendChild(postText);
    post.appendChild(buttonsDiv);
    feed.appendChild(post);
  }
  
  // Post button event listener
  postButton.addEventListener('click', () => {
    const content = postContent.value.trim();
    if (content) {
      addPost(content);
      postContent.value = ''; // Clear input after posting
    } else {
      alert('Please enter some text to post!');
    }
  });
  