export interface DataPoint {
    time: number;
    price: number;
}

export enum TradeStatus {
    IDLE = 'IDLE',
    TRADING = 'TRADING',
    WON = 'WON'
}
