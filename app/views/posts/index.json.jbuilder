json.posts(@post) do |post|

  json.title post.title
  json.body post.body
  json.rating post.rating
  json.created_at time_ago_in_words(post.created_at) + " ago"

end
