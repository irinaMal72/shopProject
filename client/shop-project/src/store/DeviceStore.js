import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = [
            {id:1,name:"Холодильники"},
            {id:2,name:"Телефоны"},
        ]
        this._brands = [
            {id:1,name:"Samsung"},
            {id:2,name:"Apple"},
            {id:3,name:"Lenovo"},
        ]
        this._devices = [
            {id:2, name:"12 Pro", price:100000, rating: 0, img:"https://i-mobilestore.ru/wa-data/public/shop/products/97/84/8497/images/38004/38004.970.jpg"}
        ]
        this._selectedType = {}
        this._selectedBrand = {}
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setDevices(devices) {
        this._devices = devices
    }

    setSelectedType(type){
        this._selectedType = type
    }

    setSelectedBrand(brand){
        this._selectedBrand = brand
    }

    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get devices() {
        return this._devices
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }

}