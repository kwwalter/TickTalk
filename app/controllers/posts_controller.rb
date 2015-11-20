class PostsController < ApplicationController

  def index
    @posts = Post.all
  end

  def show
    @post = Post.find_by_id(params[:id])
  end

  def create
    @post = Post.new(post_params)

    if @post.save
      render json: @post
    else
      render json: {
        error: {
          message: @post.errors.full_messages.to_sentence
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
