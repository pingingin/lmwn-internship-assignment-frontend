import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

interface Restaurant {
    name: string
    id: number
    coverImage: string
    menus: string[]
    activeTimePeriod: {
        open: string
        close: string
    }
}

interface FullMenu{
    name: string
    id: string
    thumbnailImage?: string
    fullPrice: number
    discountedPercent: number
    discountedTimePeriod?: {
       begin: string
       end: string
    }
    sold: number
    totalInStock: number
    largeImage?: string
    options: {
       label: string
       choices: {
         label: string
       }[]
    }[]
}

interface RestaurantFullMenu {
    name: string
    id: number
    coverImage: string
    menus: FullMenu[]
    activeTimePeriod: {
        open: string
        close: string
    }
}

// get Restaurant 
const getRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    let restaurantId: string = req.params.restaurantId
    let result: AxiosResponse = await axios.get(`https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/${restaurantId}.json`);
    let message: Restaurant = result.data;

    async function getResFull(message: Restaurant) {
        let menus: FullMenu[] = [];
        let resMenus: FullMenu[] = [];
        await Promise.all(message.menus.map((obj: string) =>
            axios.get(`https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/${message.id}/menus/${obj}/full.json`).then(response => {
            menus.push(response.data);
          })
        ));
        message.menus.map((obj: string, index: number) => {
            for(let i in menus) {
                if(menus[i].name === obj) {
                    resMenus.push(menus[i]);
                    break
                }
            }
        });
        
        return resMenus;
    }

    let menus = await getResFull(message)

    let RestaurantFullMenu: RestaurantFullMenu = {
        name: message.name,
        id: message.id,
        coverImage: message.coverImage,
        menus: menus,
        activeTimePeriod: {
            open: message.activeTimePeriod.open,
            close: message.activeTimePeriod.close
        }
    }

    return res.status(200).json(RestaurantFullMenu);
};

export default { getRestaurant };