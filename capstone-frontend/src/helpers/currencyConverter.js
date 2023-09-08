function convertToDollars(amount){
    const dollars = (amount / 100).toLocaleString("en-US", {style:"currency", currency:"USD"});
    return dollars;
}

export {convertToDollars};