import {SiteClient} from 'datocms-client'

export default async function recebeRequests(request, response){
    if(request.method === 'POST'){
        const TOKEN= 'e0e2123546e5339c4b2d6e7c40455a';

        const client = new SiteClient(TOKEN);

        const createdRecord = await client.items.create({
            itemType: "968053",
            ...request.body,
            /*title: "Colheita Feliz",
            imageUrl: "https://pbs.twimg.com/profile_images/1130326351/colheita_400x400.jpg",
            creator_slug: "Hibrael"*/
        })

        console.log(createdRecord);
        response.json({
            dados: 'Um dado qualquer', 
            createdRecord : createdRecord,
        })
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, somente no POST!'
    })
}