class CommentsController < ApplicationController

  def create
    post = Post.find_by_id(params[:post_id])
    @comment = post.comments.new(comment_params)

    if @comment.save
      render json: @comment
      # might also just have to leave this line blank? empty if statement?
    else
      render json: {
        error: {
          message: @comment.errors.full_messages.to_sentence
        }
      }
    end
  end

  def plusOne
    post = Post.find_by_id(params[:post_id])
    comment = post.comments.find_by_id(params[:id])
    comment[:rating] += 1
  end

  def minusOne
    post = Post.find_by_id(params[:post_id])
    comment = post.comments.find_by_id(params[:id])
    comment[:rating] -= 1
  end

  private

  def comment_params
    return params.require(:comment).permit(:commentBody)
  end

end
