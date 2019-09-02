
$(document).ready(() => {

  let endPoint = "https://public.redmist.gg/v1/cards";

  $.getJSON(endPoint, ((data) => {

    

    // data.cards.forEach(element => {
    //     $('.artifactCardsList').append('<div id="' + element.name + '" class="card"><div>' + element.name + '</div><img src="' + element.images.small + '" alt="" srcset=""></div>'); 
    // });

    function getCards(obj, sort = 'a-to-z', page = 1) {
      
      cardsSorted = sortCards(obj, sort)
      var firstPage = page == 1 ? 0 : (page - 1) * 24;
      var lastPage = page * 24;
      var cardPage = cardsSorted.slice(firstPage, lastPage)

      $(".card").remove();
      cardPage.forEach((element) => {
        let cardName = element.name;
        let imgSrc = element.images.full;
        let htmlCard = '<div class="card" id="' + cardName + '"><div class="cardName ' + (element.color ? element.color : 'gold') + '">' + cardName + '</div><a href="' + element.links.redmist + '" target="_blank"><img src = " ' + imgSrc + '"></a><div class = "stats ' + (element.color ? element.color : 'gold') + '"><span class="attack">ATK: ' + element.stats.attack + '</span><span class="armor">DEF: ' + element.stats.armor + '</span><span class="health">HP: ' + element.stats.health + '</span></div></div>'
        $(".artifactCardsList").append(htmlCard);
        $('.cardQuantity').text(obj.length);
        // if(element.color == null){
        //     $('.cardName .stats').css('background-color', 'gold');
        // }


        function showPage(pageNo) {
          let cardQuantity = obj.length;
          let pageMax = parseInt(cardQuantity / 24);
          let cardPage = parseInt(element.index()) + 1;
          let htmlPage = $('.page').text();

          if (cardPage == htmlPage) {
            $('.page:eq(htmlPage)').click(() => {
              $('.card').show();
            })
          }
        }
      })
    }

    function sortCards(obj, sort) {
      if (sort == 'a-to-z') {
        return obj.sort((a, b) => { return a.name.toLowerCase() - b.name.toLowerCase() ? -1 : 1 });
      }
      else if (sort == 'z-to-a') {
        return obj.sort((a, b) => { return a.name.toLowerCase() - b.name.toLowerCase() ? 1 : -1 });
      }
      else if (sort == 'color') {
        return obj.sort((a, b) => { return a.color.toLowerCase() > b.color.toLowerCase() ? -1 : 1 })
      }
      else if (sort == 'attack-asc') {
        return obj.sort((a, b) => { return a.stats.attack > b.stats.attack ? -1 : 1 });
      }
    }



    let cards = data.cards;
    let redCards = cards.filter(f => { return f.color == 'red' });
    let blueCards = cards.filter(f => { return f.color == 'blue' });
    let blackCards = cards.filter(f => { return f.color == 'black' });
    let greenCards = cards.filter(f => { return f.color == 'green' });

    let basicCards = cards.filter(f => { return f.rarity == 'basic' });
    let commonCards = cards.filter(f => { return f.rarity == 'common' });
    let uncommonCards = cards.filter(f => { return f.rarity == 'uncommon' });
    let rareCards = cards.filter(f => { return f.rarity == 'rare' });

    let herosCards = cards.filter(f => { return f.type == 'hero' });
    let spellsCards = cards.filter(f => { return f.type == 'spell' });
    let creepsCards = cards.filter(f => { return f.type == 'creep' });
    let improvCards = cards.filter(f => { return f.type == 'improvement' });
    let itemsCards = cards.filter(f => { return f.type == 'item' });

    getCards(cards);
    let colorFilter = function(){
    $('.red').on('click', function () { getCards(redCards) });
    $('.blue').on('click', function () { getCards(blueCards) });
    $('.black').on('click', function () { getCards(blackCards) });
    $('.green').on('click', function () { getCards(greenCards) });
  }
  
  let rarityFilter = function(){
    $('.basic').on('click', function () { getCards(basicCards) });
    $('.common').on('click', function () { getCards(commonCards) });
    $('.uncommon').on('click', function () { getCards(uncommonCards) });
    $('.rare').on('click', function () { getCards(rareCards) });
  }

  let typeFilter = function(){
    $('.all').on('click', function () { getCards(cards) });
    $('.heros').on('click', function () { getCards(herosCards) });
    $('.spells').on('click', function () { getCards(spellsCards) });
    $('.creeps').on('click', function () { getCards(creepsCards) });
    $('.improv').on('click', function () { getCards(improvCards) });
    $('.items').on('click', function () { getCards(itemsCards) });
  }

  // function merge (bigArray){
  //   let array = [];
  //   let middleArray = bigArray.reduce((a, b) => {
  //     return a.concat(b);
  //   })

  //   for (arrItem in middleArray){
  //     if (array.indexOf(arrItem) == -1){
  //       array.push(arrItem);
  //     }
  //   }

  //   return array;
  // }

  // merge([colorFilter, rarityFilter, typeFilter])



    // getCards(cards);
    // $('.red').on('click', function () { getCards(redCards) });
    // $('.blue').on('click', function () { getCards(blueCards) });
    // $('.black').on('click', function () { getCards(blackCards) });
    // $('.green').on('click', function () { getCards(greenCards) });

    // $('.basic').on('click', function () { getCards(basicCards) });
    // $('.common').on('click', function () { getCards(commonCards) });
    // $('.uncommon').on('click', function () { getCards(uncommonCards) });
    // $('.rare').on('click', function () { getCards(rareCards) });

    // $('.all').on('click', function () { getCards(cards) });
    // $('.heros').on('click', function () { getCards(herosCards) });
    // $('.spells').on('click', function () { getCards(spellsCards) });
    // $('.creeps').on('click', function () { getCards(creepsCards) });
    // $('.improv').on('click', function () { getCards(improvCards) });
    // $('.items').on('click', function () { getCards(itemsCards) });

    $('.cardSort').change(function () { getCards(cards, $('.cardSort option:selected').val()) })

    $('#pageReference').pagination({
      total: cards.length,
      current: 1,
      length: 24,
      size: 2,
      prev: "&lt;",
      next: "&gt;",

      click:function (e) {
        getCards(cards, 'a-to-z', e.current)
      }
    });

  })
  );























})