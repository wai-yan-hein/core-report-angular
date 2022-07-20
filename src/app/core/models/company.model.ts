import { Region } from 'src/app/core/models/region.model';
export interface Company {
    compCode: string,
    compName: string,
    phone: string,
    email:string,
    address: string,
    startDate: string,
    active: boolean,
    region: Region
}