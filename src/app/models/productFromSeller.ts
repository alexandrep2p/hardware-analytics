import * as moment from 'moment';

export interface ProductFromSeller {
    id: number,
    name: string,
    price: number,
    seller: string,
    createdAt: moment.Moment,
    updatedAt: moment.Moment
}
