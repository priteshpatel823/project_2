function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

$(document).ready(function() {
  let userInfo;
  let pastComments;
  const formListener = $('#comment-section');
  const userComment = $('#comment');

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    console.log(data);
    userInfo = data;
    $(".login").hide();
    $(".profile").show();
    $(".profile").children("img").attr("src",data.picture);
  }).fail(err => {
    console.log("Your not logged in");
  });

  $.get('/api/comments').then(data => {
    console.log(data);
    pastComments = data;
    const commentDiv = $('#past-comments');
   

    pastComments.forEach(comment => {
      console.log(comment);
      let li = `<li>` + comment.comment + `</li>`;
      commentDiv.append(li);
      // li.html(JSON.stringify(comment.comment))
      })
  });

 

  // 

  // const createLi = document.createElement('li')

  

  // $('#past-comments').text(`${data[].comment}`);

  formListener.on('submit', function(event){
    event.preventDefault();
    const newComment = {
      comment: userComment.val(),
      email: userInfo.email
    }

    console.log(newComment);
    
    $.post('/api/comments', newComment).then(function(){
      console.log('Comment posted.');
    })
  })

  /*$("#dog").on("click", function() {
    event.preventDefault();
    var queryURL = "https://dog.ceo/api/breeds/image/random"

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response) {
      console.log(response);
    })
  })

  $("#cat").on("click", function() { 

  function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        console.log('responseText:' + xmlhttp.responseText);
        try {
          var data = JSON.parse(xmlhttp.responseText);
        } catch (err) {
          console.log(err.message + " in " + xmlhttp.responseText);
          return;
        }
        callback(data);
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }
  ajax_get('https://api.thecatapi.com/v1/images/search', function(data) {
    document.getElementById("id").innerHTML = data[0]["id"];
    document.getElementById("url").innerHTML = data[0]["url"];
    var html = '<img src="' + data[0]["url"] + '">';
    document.getElementById("image").innerHTML = html;
  })
});*/

    $("#submit").on("click", function() {
      event.preventDefault();
      var queryURL1 =
        "https://api.rescuegroups.org/v5/public/animals/search/available/haspic?include=locations,orgs";

      $.ajax({
        url: queryURL1,
        method: "POST",
        contentType: "application/json",
        headers: {
          Authorization: "ERWX75Rx"
        },
        data: JSON.stringify({
          data: {
            filters: [
              {
                fieldName: "statuses.name",
                operation: "equals",
                criteria: "Available"
              },
              {
                fieldName: "species.singular",
                operation: "equals",
                criteria: $("#species option:selected").val()
              }
            ],
            filterRadius: {
              miles: $("#distance option:selected").val(),
              postalcode: $("#zipCode")
                .val()
                .trim()
            }
          }
        })
      }).then(function(result) {
  
        var queryURL2 = "https://api.rescuegroups.org/v5/public/orgs/search/";

        $.ajax({
          url: queryURL2,
          method: "POST",
          contentType: "application/json",
          headers: {
            Authorization: "ERWX75Rx"
          },
          data: JSON.stringify({
            data: {
              filters: [],
              filterProcessing: "1",
              filterRadius: {
                miles: $("#distance option:selected").val(),
                postalcode: $("#zipCode")
                  .val()
                  .trim()
              }
            }
          })
        }).then(function(response) {
          var orgs = {};
          console.log(response);
          for (var i = 0; i < response.data.length; i++) {
            orgs[response.data[i].id] = {
              name: response.data[i].attributes.name,
              url: response.data[i].attributes.url
            };
          }
  
          $("#pet-results")
            .html('<h4 class="has-text-centered is-size-3">Search Results</h4>')
            .append('<div class="columns is-multiline" id="pet-columns">');
  
          for (var i = 0; i < result.data.length - 5; i++) {
            var col = $("<div>")
              .addClass("column is-one-third")
              .attr("id", "petCard");
            var title = $("<h3>")
              .addClass("card-title has-text-weight-bold is-size-5")
              .text(result.data[i].attributes.name);
            var card = $("<div>").addClass("card has-background-light");
            var breed = $("<p>")
              .addClass("card-text")
              .text("Breed: " + result.data[i].attributes.breedString);
            var sex = $("<p>")
              .addClass("card-text")
              .text("Sex: " + result.data[i].attributes.sex);
            var distance = $("<p>")
              .addClass("card-text")
              .text("Distance: " + result.data[i].attributes.distance + " miles");
            var orgName = $("<p>")
              .addClass("card-text")
              .text(
                "Organization: " +
                  orgs[result.data[i].relationships.orgs.data[0].id].name
              );
            var orgUrl = $("<a>")
              .addClass("card-text")
              .text(orgs[result.data[i].relationships.orgs.data[0].id].url)
              .attr(
                "href",
                orgs[result.data[i].relationships.orgs.data[0].id].url
              );
            var body = $("<div>").addClass("card-body");
            var img = $("<img>")
              .attr("src", result.data[i].attributes.pictureThumbnailUrl)
              .addClass("image is-128x128");
  
            col.append(
              card.append(
                body.append(title, img, breed, sex, distance, orgName, orgUrl)
              )
            );
            $("#pet-columns").append(col);
          }
        });
      });
    });
  });
