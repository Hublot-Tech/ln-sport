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
      </aside>
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Match Highlights</a>
        <a className="link link-hover">Player Profiles</a>
        <a className="link link-hover">Team Analysis</a>
        <a className="link link-hover">Upcoming Matches</a>
        <a className="link link-hover">Transfer News</a>
        <a className="link link-hover">Game Recaps</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">A Propos de nous</a>
        <a className="link link-hover">Contact Us</a>
        <a className="link link-hover">Privacy Policy</a>
        <a className="link link-hover">Terms & Conditions</a>
      </nav>
    </footer>
  );
};

export default Footer;
