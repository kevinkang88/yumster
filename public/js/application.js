$(document).ready(function () {
  searchDishMakeDiv();
  afterPickingRecipe();
  submitToSchedule();
});
var searchDishMakeDiv = function() {
  $('#dishSubmitBtn').on('click',function(event){
  // $('#recipeList')
   event.preventDefault();
    var searchDish = $('input#ingredientBox').val()
    var urlYumly = "http://api.yummly.com/v1/api/recipes?_app_id=86417a1d&_app_key=d09b9ab8acbaa5d3dc6acad8207b313f&q=" + searchDish
      $.ajax({
      url:urlYumly,
      type:"GET",
      dataType:"jsonp"
    }).done(function(dataReceived) {
      var matchDataArray = dataReceived.matches
      for (var i =  0; i < matchDataArray.length; i++){
        var aryIngredients = matchDataArray[i].ingredients
        var dishId = matchDataArray[i].id
        $('#recipeList').append("<div class='choiceBox choiceBox"+i+"' id='" + dishId + "'><a href='#' id='choiceLink'><img src='http://i.imgur.com/RAu3JLQ.png'></a><div id='box'" + i + "><h8 id='dishName'>"+ matchDataArray[i].recipeName + "</h8></div><br>" + matchDataArray[i].rating + "<br>")
      }
      console.log("working YES!!!")
    }).fail(function() {
      console.log("not working...:[!")
    })
  })
  $('#addIngredient').on('click',function(event){
    event.preventDefault();
    $('.ingredientLabel').after("<input type='text' name='ingredient' placeholder='e.g., corn' id ='ingredientBox'/><br>");
  })
}




var submitToSchedule = function() {
  $('#submitFormBtn').on('click',function(event){
    event.preventDefault();
    var recipeUrl = $('#submitDishPlan a').attr('href');
    var dishName = $('#dishTitleForm').val();
    var noteForm = $('#notesForm').val();
    var dateForm = $('#dateForm').val();
    $.ajax({
      url: "/recipes",
      type: "POST",
      dataType: "json",
      data: { recipeurl:recipeUrl,dish_name: dishName, note: noteForm, date_form: dateForm }
    }).done(function(dataReceived){
      console.log("working man!!!!!now implement")
      $('#submitDishPlan').hide(10000);
      $('.choiceBox').hide(1000);
    }).fail(function(){
      console.log("not working man!:[:[")
    })
  })
}





var sendDataToForm = function(fullRecipeUrl,title,ingredients,img) {
  $('#ingredientList').children().remove()
  $('#dishTitleForm').attr('value', title)
  $('#dishImg').attr('src',img);
  $('#submitDishPlan a').attr('href',fullRecipeUrl)
  for (var i = 0; i < ingredients.length; i++){
    $('#ingredientList').append("<li>" + ingredients[i] + "</li>");
  }
}



var afterPickingRecipe = function() {
  $('#recipeList').on('click','a', function(event){
    event.preventDefault();
    var recipeId = $(event.target).parents('.choiceBox')[0].id
    var urlYumly = "http://api.yummly.com/v1/api/recipe/" + recipeId + "?_app_id=86417a1d&_app_key=d09b9ab8acbaa5d3dc6acad8207b313f"
    $.ajax({
      url:urlYumly,
      type:"GET",
      dataType:"jsonp"
      }).done(function(dataReceived) {
        console.log("working YES!!!")
        var dishTitle = (dataReceived.attribution.text).slice(0,-39);
        var ingredientsAry = dataReceived.ingredientLines;
        var imgUrl = dataReceived.images[0].hostedLargeUrl;
        var fullRecipeUrl = dataReceived.source.sourceRecipeUrl;
        sendDataToForm(fullRecipeUrl, dishTitle,ingredientsAry,imgUrl);
      }).fail(function() {
      console.log("not working...:[!")
    })
  })
}

// var fillInCalendar = function() {
//   $.ajax({
//     url:'/calendarinfo',
//     type:"GET",
//     dataType:"json"
//     }).done(function(dataReceived) {
//       $('calendarTable').append()
//       debugger
//       console.log("working YES!!!");
//     }).fail(function() {
//     console.log("not working...:[!");
//   })
// }