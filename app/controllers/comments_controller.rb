class CommentsController < ApplicationController

  def create
    post = Post.find_by_id(params[:post_id])
    comment = post.comments.new(comment_params)

    if comment.save
      respond_with post, comment
    else
      render json: {
        error: {
          message: comment.errors.full_messages.to_sentence
        }
      }
    end
  end

  def plusOne
    post = Post.find_by_id(params[:post_id])
    comment = post.comments.find_by_id(params[:id])
    comment[:rating] += 1

    respond_with post, comment
  end

  def minusOne
    post = Post.find_by_id(params[:post_id])
    comment = post.comments.find_by_id(params[:id])
    comment[:rating] -= 1

    respond_with post, comment
  end

  private

  def comment_params
    return params.require(:comment).permit(:commentBody)
  end

end
