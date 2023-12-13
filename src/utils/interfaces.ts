import { LatLng } from "leaflet";


export interface Message {
    id: string;
    default_message: string;
}

export interface Picture {
    id: string;
    image: string;
}

export interface GeoLocation {
    id: string;
    currentPoint: LatLng;
}

export interface TravelRoutes {
    startPoint: string;
    endPoint: string;
    date: string;

    Geolocation: GeoLocation[];
    Message: Message[];
    Picture: Picture[];
}

export interface Contacts {
    id: string;
    name: string;
    email: string;
    phone: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    rut: string;
    phone: string;
    address: string;
    contacts: Contacts[];
    TravelRoutes: TravelRoutes[];
}

interface token {
    own: string;
    exp: number;
}

