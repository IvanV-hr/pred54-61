import { useParams } from "react-router";
import { apiRequest } from "../api/api";
import { useEffect, useState } from "react";
import NotFound from "./NotFound";
import GalerijaVozila from "../components/GalerijaVozila";
import KomentarVozila from "../components/KomentarVozila";
import KalkulatorRata from "../components/KalkulatorRata";

const DetaljiVozila = () => {
  const { id } = useParams();
  const [vozilo, setVozilo] = useState(null);
  const [ucitavanje, setUcitavanje] = useState(true);

  useEffect(() => {
    async function dohvatiVozilo() {
      try {
        const response = await apiRequest(`products/${id}`);
        setVozilo(response);
      } finally {
        setUcitavanje(false);
      }
    }
    dohvatiVozilo();
  }, [id]);

  if (ucitavanje) {
    return (
      <section className="section">
        <p>Učitavanje...</p>
      </section>
    );
  }

  if (!vozilo) {
    return (
      <NotFound
        naslov="Vozilo nije pronađeno."
        putanja="/vozila"
        povratakTekst="Natrag na aute"
      />
    );
  }

  return (
    <>
      <GalerijaVozila vozilo={vozilo} />
      <KalkulatorRata cijenaVozila={vozilo.price} />
      <section className="section">
        <h2>Recenzije kupaca</h2>
        <ul className="komentari">
          {vozilo.reviews.map((recenzija) => (
            <KomentarVozila
              key={recenzija.reviewerEmail}
              recenzija={recenzija}
            />
          ))}
        </ul>
      </section>
    </>
  );
};

export default DetaljiVozila;
