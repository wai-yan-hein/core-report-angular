export interface Stock{
    key?:StockKey,
    userCode:string
    stockName:string,
    balnace:string,
    locName:string
}

export interface StockKey{
    stockCode:string,
    locCode:string,
    compCode:string
}
