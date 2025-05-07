import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-base-primary p-10 text-white">
      <aside>
        <Image src="/ln-foot.svg" alt="LN Football" width={300} height={200} />
        <p className="mt-4">
          OBTENER LES DERNIERES EXCLUSIVITE EN MATIERE DE FOOT!.
          <br />
          Rejoignez notre communauté et recevez les dernières mises à jour, les
          points forts du jeu et du contenu exclusif directement dans votre
          boîte de réception. suivez-nous sur les réseaux sociaux et
          abonnez-vous à notre newsletter dès aujourd&apos;hui !
        </p>
        <div className="mt-6">
          <a
            href="https://lnfoot-img.hublots.co/app-release/app-release.apk" // Replace with your actual app download URL
            className="btn bg-base-secondary text-white transition hover:bg-[#ad310f]"
          >
            📲 Télécharger l&apos;application
          </a>
        </div>
      </aside>
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link-hover link">Match Highlights</a>
        <a className="link-hover link">Player Profiles</a>
        <a className="link-hover link">Team Analysis</a>
        <a className="link-hover link">Upcoming Matches</a>
        <a className="link-hover link">Transfer News</a>
        <a className="link-hover link">Game Recaps</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link-hover link">A Propos de nous</a>
        <a className="link-hover link">Contact Us</a>
        <a className="link-hover link">Privacy Policy</a>
        <a className="link-hover link">Terms & Conditions</a>
      </nav>
    </footer>
  );
};

export default Footer;
