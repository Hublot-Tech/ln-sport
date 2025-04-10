

import { type Publicite } from "@ln-foot/app/_components/landingSections/Publicites";
import { createTRPCRouter, publicProcedure } from "@ln-foot/server/api/trpc";


export const publiciteRouter = createTRPCRouter({
  latest: publicProcedure.query(({}) => {
    
    const publicites: Publicite[]=[
        {
            imagePub: "/Pub.png",
            title: `RESTEZ CONNECTÉS  AVEC NOUS`,
            description:`Suivez nous sur nos différents réseaux sociaux et partagez vos avis`,
        },
        ];
        return { publicites };
    }) 
  });