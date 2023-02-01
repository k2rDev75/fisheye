function likesIncDec(heart, mediaLikes, media, likesElement) {
    let likeContent = parseInt(mediaLikes?.textContent);
    if (likeContent === media.likes) {
      mediaLikes.textContent = likeContent + 1;
      likesElement.textContent++;
      heart.classList.add("add-heart");
      mediaLikes.classList.add("media_likes-add");
    } else {
      mediaLikes.textContent = likeContent - 1;
      likesElement.textContent--;
      heart.classList.remove("add-heart");
      mediaLikes.classList.remove("media_likes-add");
    }
  }