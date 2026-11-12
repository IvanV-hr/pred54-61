import { useParams } from "react-router";
import { apiRequest } from "../api/api";
import { useEffect, useState } from "react";
import NotFound from "./NotFound";
import GalerijaVozila from "../components/GalerijaVozila";
import KalkulatorRata from "../components/KalkulatorRata";
import RecenzijeVozila from "../components/RecenzijeVozila";

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
      <RecenzijeVozila recenzije={vozilo.reviews} />
    </>
  );
};

export default DetaljiVozila;
