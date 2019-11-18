$(document).ready(() => {

    const ENDPOINT = "https://public.redmist.gg/v1/cards"

    let cards = []
    let sort = ''
    let filter = ''

    function getCards() {
        axios.get(ENDPOINT).then(response => {
            cards = response.data.cards
        }).catch(error => {
            alert(error)
        })
    }
    getCards()











})
