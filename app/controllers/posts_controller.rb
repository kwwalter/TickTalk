class PostsController < ApplicationController

  def index
    respond_with Post.all
  end

  def show
    respond_with Post.find_by_id(params[:id])
  end

  def create
    post = Post.new(post_params)

    if post.save
      respond_with post
    else
      render json: {
        error: {
          message: post.errors.full_messages.to_sentence
        }
      }
    end
  end

  def plusOne
    post = Post.find_by_id(params[:id])
    post[:rating] += 1
  end

  def minusOne
    post = Post.find_by_id(params[:id])
    post[:rating] -= 1
  end

  private

  def post_params
    return params.require(:post).permit(:title, :body)
  end

end
