import { apiClient } from "@ln-foot/api/api-client";
import type { Advertisement } from "@ln-foot/api/types";

const Advertisement: React.FC<{ publicite: Advertisement }> = ({
  publicite,
}) => {
  return (
    <div className="flex w-full cursor-pointer flex-col gap-5 md:flex-row">
      <img
        alt="Article"
        src={publicite.imageUrl ?? ""}
        className="w-full md:h-[600px] md:w-[65%]"
      />

      <div className="flex w-full flex-row items-center gap-3 rounded-xl bg-[#0D2648] p-2 text-white md:h-[600px] md:w-[35%] md:flex-col md:items-start md:p-10">
        <h2 className="card-title hidden md:flex">{publicite.title}</h2>
        <p className="hidden text-[#ffffffbb] md:flex">
          {publicite.description}
        </p>
        <p className="flex md:hidden">Follow us: </p>
        <div className="flex w-max flex-row items-center justify-around rounded-xl p-2 md:w-full md:bg-black">
          <div className="flex flex-row items-center gap-5">
            <img src="/facebook.png" alt="facebook" className="" />
            <p className="hidden md:flex">Facebook</p>
          </div>
          <p className="hidden md:flex">&gt;</p>
        </div>
        <div className="flex w-max flex-row items-center justify-around rounded-xl p-2 md:w-full md:bg-black">
          <div className="flex flex-row items-center gap-5">
            <img src="/instagram.png" alt="instagram" className="" />
            <p className="hidden md:flex">Instagram</p>
          </div>
          <p className="hidden md:flex">&gt;</p>
        </div>
        <div className="flex w-max flex-row items-center justify-around rounded-xl p-2 md:w-full md:bg-black">
          <div className="flex flex-row items-center gap-5">
            <img src="/twitter.png" alt="twitter" className="" />
            <p className="hidden md:flex">Twitter</p>
          </div>
          <p className="hidden md:flex">&gt;</p>
        </div>
        <div className="flex w-max flex-row items-center justify-around rounded-xl p-2 md:w-full md:bg-black">
          <div className="flex flex-row items-center gap-5">
            <img src="/youtube.png" alt="youtube" className="" />
            <p className="hidden md:flex">Youtube</p>
          </div>
          <p className="hidden md:flex">&gt;</p>
        </div>
      </div>
    </div>
  );
};

export default async function Advertisements() {
  const advertisements = await apiClient.advertisements.findAll();

  return (
    <section className="section bg-[#F1F0F0] p-4">
      <div className="section-title">
        <h3 className="header-2">Publicite</h3>
      </div>
      <div className="">
        {advertisements.map((advertisement, ind) => (
          <Advertisement key={ind} publicite={advertisement} />
        ))}
      </div>
    </section>
  );
}
