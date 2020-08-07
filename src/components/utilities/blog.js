export const get_all_unique_tags = articles => {
  // Since each article has many tags,
  // We'll join all the tags together,
  // Then we unique them
  let tags = articles.map(article => {
    return article.tags.join(',');
  }).join(',').split(',');

  // Unique tags
  return [...new Set(tags)];
}
