import { Link } from "react-router";
import { kategorije } from "../konstante/constants";
import Kartica from "../components/Kartica";
import KontaktCTA from "../components/KontaktCTA";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { apiRequest } from "../api/api";
import KarticaMotocikla from "../components/KarticaMotocikla";

const Naslovnica = () => {
  const [motocikli, setMotocikli] = useState([]);
  const [ucitavanje, setUcitavanje] = useState(true);
  const [greska, setGreska] = useState("");
  const [brojPokusaja, setBrojPokusaja] = useState(0);

  useEffect(() => {
    async function dohvatiMotocikle() {
      try {
        const response = await apiRequest(
          "products/category/motorcycle?limit=4",
        );
        setMotocikli(response.products);
      } catch {
        setGreska("Prikaz motocikala nije uspio. Pokušajte ponovo.");
      } finally {
        setUcitavanje(false);
      }
    }
    dohvatiMotocikle();
  }, [brojPokusaja]);

  function pokusajPonovo() {
    setUcitavanje(true);
    setGreska("");
    setBrojPokusaja(brojPokusaja + 1);
  }

  return (
    <>
      <section className="section">
        <h2>Usluge našeg autoservisa</h2>
        <p>
          Od redovitog održavanja do provjere kvarova. Pošaljite upit i
          dogovorite termin.
        </p>
        <div className="kartice">
          {kategorije.map((kategorija) => (
            <Kartica key={kategorija.naslov} podatci={kategorija} />
          ))}
        </div>
        <div className="actions">
          <Link className="gumb" to="/kontakt">
            Pošalji upit
          </Link>
          <Link className="gumb" to="/usluge">
            Pogledajte usluge
          </Link>
        </div>
      </section>
      <section className="section">
        <p className="oznaka">Uskoro u ponudi</p>
        <h2>Motocikli</h2>
        <p>Uz aute uskoro nudimo i motocikle.</p>
        {ucitavanje && <p>Učitavanje motocikala...</p>}
        {greska && (
          <>
            <p>{greska}</p>
            <Button onClick={pokusajPonovo}>Pokušajte ponovo</Button>
          </>
        )}
        <div className="kartice">
          {motocikli.map((motocikl) => (
            <KarticaMotocikla key={motocikl.id} motocikl={motocikl} />
          ))}
        </div>
      </section>
      <KontaktCTA />
    </>
  );
};

export default Naslovnica;
