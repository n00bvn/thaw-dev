// Remove html tags and short for 125 characters
export const short_description = content => {
  return content.replace(/<\w+[^>]*>/g, "").replace(/<\/\w+>/g, "").substr(0, 125) + " ...";
}

// Remove <script> tags to avoid XSS attacking
export const escape_javascript = content => {
  return content.replace(/<script>/g, "").replace(/<\/script>/g, "");
}
