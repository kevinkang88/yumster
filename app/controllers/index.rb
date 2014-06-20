get '/' do
  @all_users = User.all
  erb :index
end

get '/sessions/new' do
  erb :sign_in
end

post '/sessions' do
  existing_user = User.find_by_email(params[:email])
  if existing_user && existing_user.password_hash == params[:password]
    session[:user_id] = existing_user.id
    redirect '/'
  elsif existing_user == nil
    session[:error] = "wrong email"
    redirect '/sessions/new'
  else
    session[:error] = "Invalid username/password"
    redirect '/sessions/new'
  end
end

delete '/sessions/:id' do
  session.clear
  redirect '/'
end


get '/users/new' do
  erb :sign_up
end

post '/users' do
  user = User.create(name: params[:name], email: params[:email], password_hash: params[:password])
  session[:user_id] = user.id
  redirect '/'
end

post '/recipes' do
  current_user_id = current_user.id
  dish = params[:dish_name]
  note = params[:note]
  date = params[:date_form]
  recipeurl = params[:recipeurl]

  @recipe = Recipe.create(recipe_url: recipeurl, user_id: current_user_id, dish_name: dish, notes: note, cookdate: date)
  content_type 'json'
  {id:"kevin"}.to_json
end

get '/calendar' do
  current_user_id = current_user.id
  @all_recipes = User.find_by_id(current_user_id).recipes
  erb :calendar
end



