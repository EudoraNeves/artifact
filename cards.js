$(document).ready(() => {

    const ENDPOINT = "https://public.redmist.gg/v1/cards"

    let cards = []
    let sort = ''
    let filter = ''

    function getCards() {
        axios.get(ENDPOINT).then(response => {
            let allCards = response.data.cards
            // allCards.forEach(card => {
            //     cards.push(card)
            // })
            // let cards = allCards.map((card => {return card;}))
            for(card in allCards){cards.push(card);}
            console.log(cards);
        }).catch(error => {
            alert(error)
        })
    }
    getCards()










})
