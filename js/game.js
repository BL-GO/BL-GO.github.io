var summonSound = new Audio('assets/music/summonsound.mp3');

  var quartz = JSON.parse(localStorage.getItem('blgo_quartz')) || 85;
  var owned = JSON.parse(localStorage.getItem('blgo_save')) || [];
  var result;

  populateMyroom();

  document.getElementById("quartz").innerHTML = ("Saint Quartz: " + (quartz));

  function summon() {
    if (quartz > 0) {
        document.getElementById("rateUpImage").style.display= "none";
        result = users[Math.floor((Math.random() * users.length))]
        var name = String(result);
        showAndHideSummoningElements(name, result);
        quartz--;
        document.getElementById("servantsOwned").innerHTML = "Servants Owned: </br>" + (listServants().join(", "));
        localStorage.setItem('blgo_save', JSON.stringify(owned));
        localStorage.setItem('blgo_quartz', JSON.stringify(quartz));
    };
  }

  function listServants() {
    var unique = owned.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    })
    return unique;
  }

  function populateMyroom() {
    var x = document.getElementById("myroomSelect");
    while (x.firstChild) {
      x.removeChild(x.firstChild);
}
    var a = listServants();
    for (var index = 0; index < a.length; index++) {
        var option = document.createElement("option");
        option.text = a[index];
        x.add(option, x[index]);
    }
  }

  function showMyroom() {
    populateMyroom();
    document.getElementById("myroom").style.display = ("");
    document.getElementById("innergame").style.display = ("none");
  }

  function hideMyroom() {
    document.getElementById("myroom").style.display = ("none");
    document.getElementById("innergame").style.display = ("");
  }

  function showServantList() {
    document.getElementById("servantsOwned").innerHTML = "<b>Servants Owned</b>: </br>" + (listServants().join(", "));
    document.getElementById("servantList").style.display = ("");
    document.getElementById("innergame").style.display = ("none");
  }

  function hideServantList() {
    document.getElementById("servantList").style.display = ("none");
    document.getElementById("innergame").style.display = ("");
  }

  function updateMyroom() {
    document.getElementById("myroomName").style.color = ("");
    var selectedServant = document.getElementById("myroomSelect").value;
    document.getElementById("myroomName").innerHTML = selectedServant;
    if (servants[selectedServant].avatar == "yes") {
      document.getElementById("myroomAvatar").src = "assets/images/avatars/" + selectedServant.toLowerCase() + ".png";
    }
    else if (servants[selectedServant].avatar == "gif") {
      document.getElementById("myroomAvatar").src = "assets/images/avatars/" + selectedServant.toLowerCase() + ".gif";
    }
    else if (servants[selectedServant].avatar == "jpg") {
      document.getElementById("myroomAvatar").src = "assets/images/avatars/" + selectedServant.toLowerCase() + ".jpg";
    }
    else if (servants[selectedServant].avatar == "banned") {
      document.getElementById("myroomAvatar").src = "assets/images/avatars/unknown.gif";
    }
    else {
      document.getElementById("myroomAvatar").src = "assets/images/avatars/unknown.gif";
    }

    if (servants[selectedServant].class == "Moderator") {
      document.getElementById("myroomName").style.color = ("#40FF40");
    } 
    else if (servants[selectedServant].class == "Admin") {
      document.getElementById("myroomName").style.color = ("#00FFFF");
    }
    else if (servants[selectedServant].class == "Avenger") {
      document.getElementById("myroomName").style.color = ("red");
    }

    document.getElementById("myroomQuote").innerHTML = servants[selectedServant].quote || "";
    document.getElementById("myroomNP").innerHTML = "Noble Phantasm Rank: " + countInArray(owned, selectedServant, 5);
    document.getElementById("myroomAvatar").style.display = ("");
    document.getElementById("myroomClass").innerHTML = "Class: " + servants[selectedServant].class;
    document.getElementById("myroomRating").innerHTML = "Star Rating: " + servants[selectedServant].rating;
  }

  function showAndHideSummoningElements(name, result){
    summonSound.play();
    document.getElementById("name").innerHTML = result;
    document.getElementById("class").innerHTML = "Class: " + servants[name].class;
    document.getElementById("rating").innerHTML = "Star Rating: " + servants[name].rating;
    document.getElementById("quote").innerHTML = servants[name].quote || "";
    document.getElementById("quartz").innerHTML = ("Saint Quartz: " + (quartz - 1));

    document.getElementById("name").style.color = ("");
    document.getElementById("name").style.textDecoration = (""); 
    document.getElementById("name").style.display = ("none");
    document.getElementById("rating").style.display = ("none");
    document.getElementById("quote").style.display = ("none");
    document.getElementById("class").style.display = ("none");
    document.getElementById("summonImage").style.display = ("");
    document.getElementById("summonButton").style.display = ("none");
    document.getElementById("myroomButton").style.display = ("none");
    document.getElementById("servantListButton").style.display = ("none");
    document.getElementById("servantsOwned").style.display = ("none");
    document.getElementById("avatar").style.display = ("none");
    document.getElementById("NP").style.display = ("none");
    if (servants[name].avatar == "yes") {
      document.getElementById("avatar").src = "assets/images/avatars/" + name.toLowerCase() + ".png";
    }
    else if (servants[name].avatar == "gif") {
      document.getElementById("avatar").src = "assets/images/avatars/" + name.toLowerCase() + ".gif";
    }
    else if (servants[name].avatar == "jpg") {
      document.getElementById("avatar").src = "assets/images/avatars/" + name.toLowerCase() + ".jpg";
    }
    else if (servants[name].avatar == "banned") {
      document.getElementById("avatar").src = "assets/images/avatars/unknown.gif";
      document.getElementById("name").style.color = ("red");
      document.getElementById("name").style.textDecoration = ("line-through"); 
    }
    else {
      document.getElementById("avatar").src = "assets/images/avatars/unknown.gif";
    }

    if (servants[name].class == "Moderator") {
      document.getElementById("avatar").src = "assets/images/avatars/" + name.toLowerCase() + ".png";
      document.getElementById("name").style.color = ("#40FF40");
    } 
    else if (servants[name].class == "Admin") {
      document.getElementById("avatar").src = "assets/images/avatars/" + name.toLowerCase() + ".png";
      document.getElementById("name").style.color = ("#00FFFF");
    }

    var imageHidden;

    setTimeout(function(){
      document.getElementById("summonImage").style.display= imageHidden ? "" : "none";
      document.getElementById("name").style.display= imageHidden ? "none" : "";
      document.getElementById("rating").style.display= imageHidden ? "none" : "";
      document.getElementById("class").style.display= imageHidden ? "none" : "";
      document.getElementById("quote").style.display= imageHidden ? "none" : "";
      document.getElementById("servantsOwned").style.display= imageHidden ? "none" : "";
      document.getElementById("summonButton").style.display= imageHidden ? "none" : "";
      document.getElementById("myroomButton").style.display= imageHidden ? "none" : "";
      document.getElementById("servantListButton").style.display= imageHidden ? "none" : "";
      document.getElementById("avatar").style.display= imageHidden ? "none" : "";
      document.getElementById("NP").style.display= imageHidden ? "none" : "";
      imageHidden = !imageHidden;
      owned.push(result);
      document.getElementById("NP").innerHTML = "Noble Phantasm Rank: " + countInArray(owned, name, 5);
    }, 2185);
  }

function countInArray(array, item, cap = Infinity) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] === item) {
            count++;
        }
    }
    if (count < cap) {
      return count;
    }
    else {
      return cap;
    }
}


var users = [
  "Strife", "Spinach", "Kirby", "SeiKeo", "i3uster", "Seika",
  "Macchaos", "Petrikow", "Bridge", "Christemo", "Marma", "Nihilm",
  "Five_X", "Bloble", "Katie", "Cruor", "McJon", "Paitouch", "Lianru",
  "Arashi_Leonheart", "Snow", "Frosty", "Frantic", "Mooncake", "Nachos",
  "SpoonyViking", "Skull", "Draconic", "LVL", "Kotonoha", "Kyte",
  "Eddyak", "HenIchi", "LJ3", "Trubo", "Food", "Mike", "Crying Vegeta",
  "Polly", "Dartz", "You", "Sesto", "Tobias"
];