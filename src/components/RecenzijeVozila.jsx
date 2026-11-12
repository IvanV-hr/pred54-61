import { useState } from "react";
import { Button } from "./Button";
import KomentarVozila from "./KomentarVozila";

const ocjene = [5, 4, 3, 2, 1];

const RecenzijeVozila = ({ recenzije }) => {
  const [odabranaOcjena, setOdabranaOcjena] = useState(null);

  const prikazaneRecenzije = odabranaOcjena
    ? recenzije.filter((recenzija) => recenzija.rating === odabranaOcjena)
    : recenzije;

  return (
    <section className="section">
      <h2>Recenzije kupaca</h2>
      <div className="recenzije">
        <ul className="recenzije-ocjene">
          {ocjene.map((ocjena) => {
            const brojRecenzija = recenzije.filter(
              (recenzija) => recenzija.rating === ocjena,
            ).length;

            return (
              <li key={ocjena}>
                <Button
                  className={
                    odabranaOcjena === ocjena ? "gumb" : "gumb gumb-povratak"
                  }
                  onClick={() => setOdabranaOcjena(ocjena)}
                >
                  Ocjena {ocjena}
                </Button>
                <progress
                  max={recenzije.length}
                  value={brojRecenzija}
                ></progress>
                <strong>{brojRecenzija}</strong>
              </li>
            );
          })}
        </ul>
        <Button
          className="gumb gumb-povratak"
          onClick={() => setOdabranaOcjena(null)}
        >
          Prikažite sve recenzije
        </Button>
      </div>
      {odabranaOcjena && (
        <p>
          {prikazaneRecenzije.length > 0
            ? `Prikazane su recenzije s ocjenom ${odabranaOcjena}.`
            : "Nema recenzija s odabranom ocjenom."}
        </p>
      )}
      <ul className="komentari">
        {prikazaneRecenzije.map((recenzija) => (
          <KomentarVozila key={recenzija.reviewerEmail} recenzija={recenzija} />
        ))}
      </ul>
    </section>
  );
};

export default RecenzijeVozila;
