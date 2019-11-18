
$(document).ready(() => {

  let endPoint = "https://public.redmist.gg/v1/cards";

  $.getJSON(endPoint, ((data) => {

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
    // let cardsColor = cards.color;

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
    $('.red').on('click', function () { getCards(redCards) });
    $('.blue').on('click', function () { getCards(blueCards) });
    $('.black').on('click', function () { getCards(blackCards) });
    $('.green').on('click', function () { getCards(greenCards) });

    $('.basic').on('click', function () { getCards(basicCards) });
    $('.common').on('click', function () { getCards(commonCards) });
    $('.uncommon').on('click', function () { getCards(uncommonCards) });
    $('.rare').on('click', function () { getCards(rareCards) });

    $('.all').on('click', function () { getCards(cards) });
    $('.heros').on('click', function () { getCards(herosCards) });
    $('.spells').on('click', function () { getCards(spellsCards) });
    $('.creeps').on('click', function () { getCards(creepsCards) });
    $('.improv').on('click', function () { getCards(improvCards) });
    $('.items').on('click', function () { getCards(itemsCards) });

    $("#search").on("click", function () {
      //let searchVal = $("#searchBox").val() 错误
      cards.filter(element => {
        let searchVal = $("#searchBox").val() //必须在箭头函数里
        if (element.name.toLowerCase().includes(searchVal.toLowerCase())) {
          console.log(element)
          $(".artifactCardsList").empty().append('<div class="card" id="' + element.name + '"><div class="cardName ' + (element.color ? element.color : 'gold') + '">' + element.name + '</div><a href="' + element.links.redmist + '" target="_blank"><img src = " ' + element.images.full + '"></a><div class = "stats ' + (element.color ? element.color : 'gold') + '"><span class="attack">ATK: ' + element.stats.attack + '</span><span class="armor">DEF: ' + element.stats.armor + '</span><span class="health">HP: ' + element.stats.health + '</span></div></div>')
          return element
        }
      })
    })

    $("#searchBox").keydown(function (e) {
      if (e.keyCode == 13) {
        // 方法一：$("#search").click()
        $("#search").trigger("click");
      }
    });

    $('.cardSort').change(function () { getCards(cards, $('.cardSort option:selected').val()) })

    $('#pageReference').pagination({
      total: cards.length,
      current: 1,
      length: 24,
      size: 2,
      prev: "&lt;",
      next: "&gt;",

      click: function (e) {
        getCards(cards, 'a-to-z', e.current)
      }
    });

  })
  );























})