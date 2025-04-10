
import { SectionTitle } from "../common/section-title";


  export type Publicite = {
    title: string;
    imagePub: string;
    description: string;
  };
  type PublicitesProps = {
    publicites: Publicite[];
  };

  
  const Publicite: React.FC<{ publicite: Publicite }> = ({ publicite}) => {
    return (
      <div className="cursor-pointer flex flex-col md:flex-row gap-5 w-full">
     
        <img src={publicite.imagePub} alt="Article" className="w-full md:w-[65%] md:h-[600px]" />

        <div className="flex flex-row items-center md:items-start md:flex-col gap-3 w-full md:w-[35%] md:h-[600px] bg-[#0D2648] text-white p-2 md:p-10 rounded-xl">
          
          <h2 className="card-title hidden md:flex">{publicite.title}</h2>
          <p className="text-[#ffffffbb] hidden md:flex">{publicite.description}</p>
          <p className="md:hidden flex">Follow us: </p>
          <div className="md:bg-black rounded-xl p-2 w-max md:w-full flex flex-row justify-around items-center">
            
            <div className="flex gap-5 flex-row items-center">
              <img src="/facebook.png" alt="facebook" className=""/>
              <p className="hidden md:flex">Facebook</p>
            </div>
            <p className="hidden md:flex">&gt;</p>
          </div>
          <div className="md:bg-black rounded-xl p-2 w-max md:w-full flex flex-row justify-around items-center">
            <div className="flex gap-5 flex-row items-center">
              <img src="/instagram.png" alt="instagram" className=""/>
              <p className="hidden md:flex">Instagram</p>
            </div>
            <p className="hidden md:flex">&gt;</p>
          </div>
          <div className="md:bg-black rounded-xl p-2 w-max md:w-full flex flex-row justify-around items-center">
            <div className="flex gap-5 flex-row items-center">
              <img src="/twitter.png" alt="twitter" className=""/>
              <p className="hidden md:flex">Twitter</p>
            </div>
            <p className="hidden md:flex">&gt;</p>
          </div>
          <div className="md:bg-black rounded-xl p-2 w-max md:w-full flex flex-row justify-around items-center">
            <div className="flex gap-5 flex-row items-center">
              <img src="/youtube.png" alt="youtube" className=""/>
              <p className="hidden md:flex">Youtube</p>
            </div>
            <p className="hidden md:flex">&gt;</p>
          </div>
          
        </div>
      </div>
    );

  };

  const Publicites: React.FC<PublicitesProps> = ({ publicites }) => {
    return (
      <section className="section bg-[#F1F0F0] p-4">
          <div className="section-title">
            <h3 className="header-2">Publicite</h3>
            
          </div>
        <div className="">
          {publicites.map((publicite, ind) => (
            <Publicite key={ind} publicite={publicite} />
          ))}
        </div>
      </section>
    );
  };
  export { Publicites as default };




