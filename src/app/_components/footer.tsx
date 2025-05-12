import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-base-primary px-6 py-12 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-3">
        <aside>
          <Image
            src="/ln-foot.svg"
            alt="LN Foot Logo"
            width={200}
            height={80}
            className="mb-4"
          />
          <p className="text-sm leading-relaxed">
            <strong>
              Obtenez les dernières exclusivités sur le football !
            </strong>
            <br />
            Rejoignez notre communauté pour recevoir les mises à jour, les temps
            forts et du contenu exclusif directement dans votre boîte de
            réception. Suivez-nous sur les réseaux sociaux et abonnez-vous à
            notre newsletter dès aujourd&apos;hui !
          </p>
          <div className="mt-6">
            <a
              href="https://lnfoot-img.hublots.co/app-release/app-release.apk"
              className="inline-block rounded-md bg-base-secondary px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#ad310f]"
            >
              📲 Télécharger l&apos;application
            </a>
          </div>
        </aside>

        <nav>
          <h6 className="mb-4 text-lg font-semibold">Services</h6>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/highlights" className="hover:underline">
                Match Highlights
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Player Profiles
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Team Analysis
              </Link>
            </li>
            <li>
              <Link href="/live-scores" className="hover:underline">
                Upcoming Matches
              </Link>
            </li>
            <li>
              <Link href="/news" className="hover:underline">
                Transfer News
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Game Recaps
              </Link>
            </li>
          </ul>
        </nav>

        <nav>
          <h6 className="mb-4 text-lg font-semibold">Entreprise</h6>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:underline">
                À propos de nous
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Nous contacter
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Conditions d&apos;utilisation
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
