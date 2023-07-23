    export const discountSale = body => {
        return (dispatch) => {
            fetch('http://localhost:3333/sale/send', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            })
            .then(respons => respons.json())
            .then(json => console.log('Your discount is 5 %'));
        }
    }

    export const discountOrder = body => {
        return (dispatch) => {
            fetch('http://localhost:3333/order/send', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            })
            .then(respons => respons.json())
            .then(json => console.log('we will call you back'));
        }
    }