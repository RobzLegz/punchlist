export interface Project{
    title: string;
    blueprints: Plan[];
}

export interface Plan{
    title: string;
    image: string;
    points: Point[];
}

export interface Point{
    geo: {
        lat: number;
        lng: number;
    }
    coords: {
        x: number;
        y: number;
    }
    description: string;
    irl_image?: string;
}