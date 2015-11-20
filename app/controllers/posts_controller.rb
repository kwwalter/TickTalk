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
      flash[:message] = "Post succesfully saved!"
    else
      flash[:message] = @post.errors.full_messages.to_sentence
    end

    redirect_to root_path
  end

  def plusOne
  end

  def minusOne
  end

  private

  def post_params
    return params.require(:post).permit(:title, :body)
  end

end
